const mongoose = require('mongoose');
const express = require('express');
const routes = require('./routes');
const app = express();
//const controllers = require('./controllers');

const PORT = process.env.MONGODB_URL || 3001;

mongoose.connect('mongodb://localhost:27017/18-Social-Network_API');


mongoose.connection.on('connected', () => {
    console.log(`Connected to Database on Port: ${PORT} 🗄️`);
  });
  
  mongoose.connection.on('error', (err) => {
    console.log(`Error connecting to Database: ${err}`);
  });
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(routes);
  
  app.listen(PORT, () => {
    console.log(`Server is listening on Port: ${PORT} 🚀`);
  });