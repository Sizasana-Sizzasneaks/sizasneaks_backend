require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

//MongoDB Database Connection URL
const MDBCONNECTURL =
  "mongodb+srv://" + process.env.MONGODB_CONNECT_USERNAME +":" + process.env.MONGODB_CONNECT_PASSWORD + "@sizasana-sizzasneaks.wnfwn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//Server Port Number.
const port = process.env.PORT || 5000;


//Routes
const productsRoutes = require("./routes/products.js")

//Connect Routers
app.use("/products", productsRoutes);






//Connect to MongoDB Server and Running Server.  
mongoose
  .connect(MDBCONNECTURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(function () {
      //Running Server Only When MongoDB Connection Succesfully Made.
    console.log("MongoDB Database Connected Successfully!");
    app.listen(port, function () {
      console.log("Sizzasneaks Server Running at Port: " + port);
    });
  })
  .catch(function (error) {
      //Outputing MongoDB Connection Error and Not Running Server.
    console.log("MongoDB Database Connection Failed!");
    console.log(error);
  });
