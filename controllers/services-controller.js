import initKnex from "knex";
import validator from "validator";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

//GET the services
const getAllServices = async (_req, res) => {
  try {
    const data = await knex("services");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error retrieving services: ${error}`);
  }
};
//POST : send demo request
const sendDemoRequest = async (req, res) => {
  const { first_name, last_name, company, job_title, business_email } =
    req.body;

  if (!first_name || !last_name || !company || !job_title || !business_email) {
    res.status(400).json({ message: "Please fill in all the fields!" });
  }
  if (!validator.isEmail(business_email)) {
    return res.status(400).json({
      message: "Invalid email format!",
    });
  }

  try {
    const existingUser = await knex("demo").where({ business_email }).first();
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use!" });
    }
    const result = await knex("demo").insert({
      first_name,
      last_name,
      company,
      job_title,
      business_email,
    });
    res.status(201).json({
      message: "User add new demo successfully!",
      id: result[0],
      result,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: `Unable to add new user to the demo table: ${error}` });
  }
};
//GET user data from demo table
const getDemoData = async (req, res) => {
  try {
    const response = await knex("demo");
    res.status(200).json(response);
  } catch (error) {
    res
      .status(400)
      .json({ message: `Error getting data from demo table ${error}` });
  }
};

export { getAllServices, sendDemoRequest, getDemoData };
