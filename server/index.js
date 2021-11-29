import express from "express";
import colors from "colors";
import sequelize from "./db.js";
import path from "path";
import cors from "cors";

import errorHandle from "./middleware/errorHandlingMiddleware.js";
import router from "./routes/index.js";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));

app.use("/api", router);

app.get("/", (req, res) => {
  res.send(`<h1>Working</h1>`);
});

// app.use(errorHandle);

app.use((error, req, res, next) => {
  console.log(colors.bgRed.black("Error status: ", error.status));
  console.log(colors.bgRed.black("Message: ", error.message));
  res.status(error.status);
  res.json({
    status: error.status,
    message: error.message,
  });
});

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      colors.bgGreen.black("Connection has been established successfully.")
    );
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(colors.green(`Server started on ${PORT}...`));
    });
  } catch (e) {
    console.log(e);
  }
};

start();
