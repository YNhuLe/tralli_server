import initKnex from "knex";
import validator from "validator";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

//GET provider based on the category
const getProvider = async (req, res) => {
  const { id } = req.params;

  try {
    const provider = await knex("providers")
      .join("categories", "providers.category_id", "=", "categories.id")
      .join(
        "provider_availability",
        "providers.id",
        "=",
        "provider_availability.provider_id"
      )
      .where({ "providers.category_id": id })
      .select(
        "providers.provider_name",
        "providers.provider_phone",
        "provider_availability.start_time",
        "provider_availability.end_time",
        "provider_availability.is_available",
        "provider_availability.day_of_week"
      )
      .first();

    if (!provider) {
      return res
        .status(404)
        .json({ message: `Provider with the category Id of ${id} not found!` });
    }

    res.status(200).json(provider);
  } catch (error) {
    res.status(500).send(`Error retrieving provider: ${error}`);
  }
};
export { getProvider };
