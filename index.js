import "dotenv/config";
import express from "express";
import cors from "cors";

const port = process.env.PORT ?? 8080;

const app = express();
//enable cors
app.use(cors());
//serve static files
app.use(express.static("public"));
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is listening on URL http://localhost:${port}`);
});
