import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import validator from "validator";

//GET user from the table

const getUser = async (_req, res) => {
  try {
    const data = await knex("users");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error fetching users: ${error}`);
  }
};

//POST new user into database when user signed up
const addUser = async (req, res) => {
  console.log("Received body:", req.body);
  const {
    user_name,
    address,
    email,
    phone_number,
    residential_community,
    uid,
  } = req.body;

  if (
    !user_name ||
    !email ||
    !phone_number ||
    !residential_community ||
    !uid ||
    !address
  ) {
    return res.status(400).json({
      message: "Please provide information for all the fields!",
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      message: "Invalid email format!",
    });
  }

  //validate phone number format
  if (typeof phone_number !== "string") {
    return res.status(400).json({
      message: "Phone number should be a string!",
    });
  }
  const phoneRegex = /^\+\d{1,3} \(\d{3}\) \d{3}-\d{4}$/;
  if (!phoneRegex.test(phone_number)) {
    return res.status(400).json({
      message: "Phone number must be in format: +1 (919) 797-2875",
    });
  }

  try {
    const result = await knex("users").insert(req.body);
    const newUserId = result[0];
    const createdUser = await knex("users")
      .where({
        id: newUserId,
      })
      .first();
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new user: ${error}`,
    });
  }
};

const getSingleUser = async (req, res) => {
  console.log("UID received:", req.params.uid || req.body.uid);
  console.log("Got in!!!", req.params);
  const uid = req.params.uid;

  if (!uid) {
    return res.status(400).json({ message: "UID is required" });
  }
  try {
    const singleUser = await knex("users").where({ uid }).first();

    if (!singleUser) {
      return res
        .status(404)
        .json({ message: `User with ID${uid} is not found!` });
    }

    res.status(200).json(singleUser);
  } catch (error) {
    res.status(500).send(`Error getting user base on ID: ${error}`);
  }
};

const googleSignup = async (req, res) => {
  const { uid, user_name, email } = req.body;
  if (!uid || !user_name || !email) {
    return res
      .status(400)
      .json({ message: "Please provide information for all the fields!" });
  }

  try {
    const existingUser = await knex("users").where({ uid }).first();
    if (existingUser) {
      return res.status(409).json({ message: "User is already exist" });
    }
    const result = await knex("users").insert(req.body);
    const newUser = await knex("users").where({ uid }).first();
    res
      .status(201)
      .json({ message: "User added successfully!", user: newUser });
  } catch (error) {
    res.status(500).json({ message: `Unable to add new user: ${error}` });
  }
};
const addNewUserFromGoogle = async (req, res) => {
  console.log("Received body:", req.body);
  const { address, phone_number, residential_community, uid } = req.body;

  if (!phone_number || !residential_community || !uid || !address) {
    return res.status(400).json({
      message: "Please provide information for all the fields!",
    });
  }

  //validate phone number format
  if (typeof phone_number !== "string") {
    return res.status(400).json({
      message: "Phone number should be a string!",
    });
  }
  const phoneRegex = /^\+\d{1,3} \(\d{3}\) \d{3}-\d{4}$/;
  if (!phoneRegex.test(phone_number)) {
    return res.status(400).json({
      message: "Phone number must be in format: +1 (919) 797-2875",
    });
  }

  try {
    const existingUser = await knex("user").where({ uid }).first();
    if (existingUser) {
      return res.status(409).json({ message: "User is already exist" });
    }
    const result = await knex("users").insert(req.body);
    const newUserId = result[0];
    const createdUser = await knex("users")
      .where({
        id: newUserId,
      })
      .first();
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new user: ${error}`,
    });
  }
};
export { getUser, addUser, getSingleUser, addNewUserFromGoogle, googleSignup };
