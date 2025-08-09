import axios from "axios";
import "dotenv/config";

// const BASE_URL = "https://user-api.simplybook.me";
// const BASE_URL = `https://user-api.simplybook.me`;
const BASE_URL = `https://user-api.simplybook.me`;


console.log("Loaded company login:", process.env.SIMPLYBOOK_COMPANY_LOGIN);
console.log("Loaded API key:", process.env.SIMPLYBOOK_API_KEY);
console.log("Using company login:", process.env.SIMPLYBOOK_COMPANY_LOGIN);

const getServices = async () =>{
    try{

const authResponse = await axios.post(`${BASE_URL}/admin`, {
    jsonrpc: "2.0",
    method: 'getToken',
        params: {

companyLogin: process.env.SIMPLYBOOK_COMPANY_LOGIN,
        apiKey:process.env.SIMPLYBOOK_API_KEY,
   
      },
    id: 1,
});
const token = authResponse.data.result;

if(!token){
    console.log("failed to get the token: ", authResponse.data);
    return
    
}
//use token to fetch services
const serviceResponse = await axios.post(`${BASE_URL}/user`, {
    jsonrpc: "2.0",
    method: 'getServiceList',
        params: {},
    id: 2,
}, {
    headers: {
     "X-Company-Login": process.env.SIMPLYBOOK_COMPANY_LOGIN,
     "X-Token": token
    }}
    );
console.log("Service response: ", serviceResponse.data);
console.log("Token: ", token);

    // res.json(serviceResponse.data.result)
    } catch(error){
        console.log("Error fetching services: ", error.response?.data || error.message);
        // res.status(500).json({ error: "Failed to fetch services" });
    }
}

getServices()