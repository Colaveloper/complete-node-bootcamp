/* eslint-disable prettier/prettier */
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

// STARTING THE SERVER

console.log(process.env.PASSWORD);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running at ${port}....`);
});
