require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


//routes
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');


const server = express();

//middleware
server.use(cors());
server.use(express.json());

//Mongo
mongoose.connect(process.env.MONGO_URI);


mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

mongoose.connection.on("error", (err) => {
  console.log("MongoDB connection error", err);
});

//URL
server.use("/users", userRoutes);
server.use("/posts", postRoutes);

//AVVIO SERVER

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
})