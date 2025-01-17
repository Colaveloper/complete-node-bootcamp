/* eslint-disable prettier/prettier */
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

dotenv.config({ path: "./.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(console.log("established connection to the server"));

// STARTING THE SERVER

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running at ${port}....`);
});
