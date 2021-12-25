const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Middlewares
dotenv.config();
app.use('/', (req, res) => {
   res.send('Success!!!');
});

// Routes

// Server & Database
const PORT = process.env.PORT || 5000;
const DB = process.env.MONGO_URI;

mongoose
   .connect(DB)
   .then(() => console.log('Database connected successfully!'))
   .catch((err) => console.log(err.message));

app.listen(PORT, () => console.log(`Server listening to port: ${PORT}`));
