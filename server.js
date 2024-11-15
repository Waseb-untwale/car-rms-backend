const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const Router = require("./routes/useRouter");
const fileUpload = require('express-fileupload')
const categoryRouter = require("./routes/categoryRouter");
const productRouter= require('./routes/productRouter')
const uploadRouter = require('./routes/upload')
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
  useTempFiles:true
}))
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ msg: "This is Example" });
});

app.listen(PORT, () => {
  console.log("SERVER IS RUNNING ...");
});

//Routes
app.use("/user", Router);
app.use("/api", categoryRouter)
app.use("/api",uploadRouter)
app.use("/api", productRouter)


//connect mongoDB
const URI = process.env.MONGODB_URL;

mongoose
  .connect(URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });
