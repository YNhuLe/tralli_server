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

//POST new user into database when user signed up by the FORM
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


  try{
    const existingUser = await knex("users").where("email", email).orWhere("phone_number", phone_number).first();
if(existingUser){
  if(existingUser.email === email){
    return res.status(400).json({message: "Email is already in use."})
  }
  if(existingUser.phone_number === phone_number){
    return res.status(400).json({message:"Phone number is already in use."})
  }
}
  }catch(error){

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
const { user_name, address, residential_community } = singleUser;
res.status(200).json({ user_name, address, residential_community });
  } catch (error) {
    res.status(500).send(`Error getting user base on ID: ${error}`);
  }
};

// Sign up with Google account
// const googleSignup = async (req, res) => {
//   const { uid, user_name, email } = req.body;
//   if (!uid || !user_name || !email) {
//     return res
//       .status(400)
//       .json({ message: "Please provide information for all the fields!" });
//   }

//   try {
//     const existingUser = await knex("users").where({ uid }).first();
//     if (existingUser) {
//       return res.status(409).json({ message: "User is already exist" });
//     }
//     const result = await knex("users").insert(req.body);
//     const newUser = await knex("users").where({ uid }).first();
//     res
//       .status(201)
//       .json({ message: "User added successfully!", user: newUser });
//   } catch (error) {
//     res.status(500).json({ message: `Unable to add new user: ${error}` });
//   }
// };

//check if user exist and their profile is complete when signin up suing Google
const checkUser = async(req, res) =>{
  const {uid} = req.params;
  try{
    const user = await knex("users").where({uid}).first();

    if(!user){
      return res.status(200).json({exists:false})
    }
const isComplete =!!(user.address && user.phone_number && user.residential_community)
    return res.status(200).json({exists:true, complete: isComplete})
  }catch(error){
res.status(500).json({message:"Error checking user", error})
  }
}


//POST add user into the database signing up using Google
// const createFullUser = async(req, res) =>{
//   const {
//     uid,
//     user_name,
//     email,
//     address,
//     phone_number,
//     residential_community,
//   } = req.body;
//   if (
//     !uid ||
//     !user_name ||
//     !email ||
//     !address ||
//     !phone_number ||
//     !residential_community
//   ) {
//     return res.status(400).json({ message: "Please fill out all fields." });
//   }

//   //validate phone number format
//   if (typeof phone_number !== "string") {
//     return res.status(400).json({
//       message: "Phone number should be a string!",
//     });
//   }
//   const phoneRegex = /^\+\d{1,3} \(\d{3}\) \d{3}-\d{4}$/;
//   if (!phoneRegex.test(phone_number)) {
//     return res.status(400).json({
//       message: "Phone number must be in format: +1 (919) 797-2875",
//     });
//   }

//   try{
//     const existingUser = await knex("users").where({uid}).first();
//     if(existingUser){
//       return res.status(409).json({message:"User already exists in the database."})
//     }
//     await knex("users").insert(req.body);
//     return res.status(201).json({message:"User profile created successfully!"})
//   }catch(error){
//     return res.status(500).json({message:"Database error: ", error})
//   }
// }


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
    const existingUser = await knex("users").where({ uid }).first();
    if (existingUser) {
      return res.status(409).json({ message: "User is already exist" });
    }

    try {
      const existingUser = await knex("users")
        .where("email", email)
        .orWhere("phone_number", phone_number)
        .first();
      if (existingUser) {
        if (existingUser.email === email) {
          return res.status(400).json({ message: "Email is already in use." });
        }
        if (existingUser.phone_number === phone_number) {
          return res
            .status(400)
            .json({ message: "Phone number is already in use." });
        }
      }
    } catch (error) {}
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
export { getUser, addUser, getSingleUser, checkUser, addNewUserFromGoogle};
