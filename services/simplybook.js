import axios from "axios";
import "dotenv/config";

const BASE_URL = "https://user-api.simplybook.me/admin";
const getServices = async (req,res) =>{
    try{
const authResponse = await axios.post(`${BASE_URL}/login`, {

    
  "jsonrpc": "2.0",
  "method": "getToken",
  "params": {
    "company": "booktralli",
    "api_key": "c363bd4ae1a5227ccb472dd9891afe4b92d615d3b198d023d3244396942a65c4"
  },
  "id": 1


    //apiKey: process.env.SIMPLYBOOK_API_KEY,
});
const token = authResponse.data.result;
const serviceResponse = await axios.post(BASE_URL, {
    jsonrpc: "2.0",
    method: 'getToken',
        params: {
        api_key: process.env.SIMPLYBOOK_API_KEY,
      },
    id: 1,
}, {
    headers: {
        'X-Company-Login': process.env.SIMPLYBOOK_COMPANY_LOGIN,
        'X-Token': token
    }}
    );
    } catch(error){
        console.log("Error fetching services: ", error);
        
    }
}