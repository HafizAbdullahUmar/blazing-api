import "dotenv/config";
import "reflect-metadata";
import fs from "fs";
import path from "path";

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import "./utils/response/customSuccess.ts";
import { errorHandler } from "./middleware/errorHandler.ts";
import { getLanguage } from "./middleware/getLanguage.ts";
import { dbCreateConnection } from "./orm/dbCreateConnection.ts";
import routes from "./routes/index.ts";

export const app = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(getLanguage);

try {
  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, "../log/access.log"),
    {
      flags: "a",
    }
  );
  app.use(morgan("combined", { stream: accessLogStream }));
} catch (err) {
  console.log(err);
}




app.use(morgan("combined"));


app.use("/", routes);

app.use(errorHandler);

const port = Number(process.env.PORT) || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

(async () => {
  await dbCreateConnection();
})();
export default app