const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter = require('./routes/userRoutes');

// Middlewares
dotenv.config();
app.use(express.json());

// Routes
app.use('/api/users', userRouter);

app.use('/', (req, res) => {
   res.send('Success!!!');
});

// Server & Database
const PORT = process.env.PORT || 5000;
const DB = process.env.MONGO_URI;

mongoose
   .connect(DB)
   .then(() => console.log('Database connected successfully!'))
   .catch((err) => console.log(err.message));

app.listen(PORT, () => console.log(`Server listening to port: ${PORT}`));
