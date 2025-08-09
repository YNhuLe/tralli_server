import initKnex from "knex";
import configuration from "../knexfile.js";


const getSimplybookToken = async (req, res) => {
try{
    

}catch(error){
    console.error("Error fetching Simplybook token: ", error);
    res.status(500).json({ message: "Error fetching Simplybook token!" });
}
}