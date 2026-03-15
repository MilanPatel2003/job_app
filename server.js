import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import applicantRoutes from "./routes/applicantRoutes.js";
import comboRoutes from "./routes/comboRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", applicantRoutes);
app.use("/combos", comboRoutes);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
