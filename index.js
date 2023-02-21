const express = require("express");
const app = express();
const dotenv = require("dotenv");
const calculation=require("./function")
app.use(express.json());

app.get("/", (req, res) => {
  const user = req.body;
   const user_improvement= calculation(user)
   

res.json(user_improvement);



});

app.listen(5000, () => {
  console.log("server is listening at port 5000");
});
