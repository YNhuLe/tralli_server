import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
//GET all the categories

const getAllCategories = async (_req, res) => {
  try {
    const data = await knex("categories");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error retrieving categories: ${error}`);
  }
};

export { getAllCategories };
