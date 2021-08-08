require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();


//Enabling Cors for all routes

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));
app.use(express.json());

// // Initialize Firebase Admin

// // Customer Platform

// // Admin Platform

// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
// });

//MongoDB Database Connection URL
const MDBCONNECTURL =
  "mongodb+srv://" +
  process.env.MONGODB_CONNECT_USERNAME +
  ":" +
  process.env.MONGODB_CONNECT_PASSWORD +
  "@sizasana-sizzasneaks.wnfwn.mongodb.net/sizasana-sizzasneaks?retryWrites=true&w=majority";

//Server Port Number.
const port = process.env.PORT || 5000;

//Routes
const productsRoutes = require("./routes/products.js");
const reviewsRoutes = require("./routes/reviews.js");
const userRoutes = require("./routes/user.js");

//Connect Routers
app.use("/products", productsRoutes);
app.use("/reviews", reviewsRoutes);
app.use("/user", userRoutes);

//Connect to MongoDB Server and Running Server.
mongoose
  .connect(MDBCONNECTURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
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
