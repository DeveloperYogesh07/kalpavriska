import express = require("express")
import { Connection } from "mysql2"; // Add the appropriate type for your database connection library
import router from "./Router/Routes";
import { APP_PORT } from "./config/config";


const app: express.Application = express();
const connection: Connection = require("./dbConnection/dbconnection");
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.listen(APP_PORT, () => {
   console.log(`Server is listening to port:${APP_PORT}`);
});
