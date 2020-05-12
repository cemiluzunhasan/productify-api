const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

const authRoutes = require('./src/routes/auth');
const productRoutes = require('./src/routes/products');

app.use("/api", authRoutes);
app.use("/api/products", productRoutes);

mongoose.connect('mongodb://localhost:27017/Productify', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (!err) {
    console.log("Successfully connected to the database");
  }
});

app.listen(3000, () => {
  console.log("Server is running on PORT:3000");
});