import "dotenv/config";
import express from "express";
import cors from "cors";
import serviceRoutes from "./routes/services-routes.js";
import categorieRoutes from "./routes/categories-routes.js";
import userRoutes from "./routes/users-routes.js";
import providerRoute from "./routes/providers-routes.js";
const port = process.env.PORT ?? 5050;

const app = express();
//enable cors
app.use(cors());
//serve static files
app.use(express.static("public"));
app.use(express.json());

app.use("/", serviceRoutes);
app.use("/", categorieRoutes);
app.use("/", userRoutes);
app.use("/", providerRoute);
app.listen(port, () => {
  console.log(`Server is listening on URL http://localhost:${port}`);
});
