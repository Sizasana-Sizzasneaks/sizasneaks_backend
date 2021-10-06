require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
require("./models/OrderItem.js");
const cors = require("cors");

const app = express();

//Enabling Cors for all routes
var corsOptions = {
  origin: [
    "https://sizasana-ecommerce-platform.web.app",
    "https://sizasana-ecommerce-platform.firebaseapp.com",
    "https://sizasana-ecommerce-admin.web.app",
    "https://sizasana-ecommerce-admin.firebaseapp.com",
  ],
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));
app.use(express.json());

//MongoDB Database Connection URL
const MDBCONNECTURL =
  "mongodb+srv://" +
  process.env.MONGODB_CONNECT_USERNAME +
  ":" +
  process.env.MONGODB_CONNECT_PASSWORD +
  "@sizasana-sizzasneaks.wnfwn.mongodb.net/sizasana-sizzasneaks?retryWrites=true&w=majority";

//Setting a Server Port Number.
const port = process.env.PORT || 5000;

//Importing clusters of routers
const productsRoutes = require("./routes/products.js");
const reviewsRoutes = require("./routes/reviews.js");
const userRoutes = require("./routes/user.js");
const cartRoutes = require("./routes/cart.js");
const orderRoutes = require("./routes/orders.js");
const revenueRoutes = require("./routes/revenue.js");

//Appending clusters of routes
app.use("/products", productsRoutes);
app.use("/reviews", reviewsRoutes);
app.use("/user", userRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);
app.use("/revenue", revenueRoutes);

//Connecting to MongoDB Database and Running This Server.
mongoose
  .connect(MDBCONNECTURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(function () {
    //Running Server Only When MongoDB Connection Successfully Made.
    console.log("MongoDB Database Connected Successfully!");
    app.listen(port, function () {
      console.log("Sizzasneaks Server Running at Port: " + port);
    });
  })
  .catch(function (error) {
    //Outputting MongoDB Connection Error and Not Running Server.
    console.log("MongoDB Database Connection Failed!");
    console.log(error);
  });
