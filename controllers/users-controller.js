import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

//GET user from the table

const getUser = async (req, res) => {
  try {
    const data = await knex("users");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error fetching users: ${error}`);
  }
};

export { getUser };
