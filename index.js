const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const productRouter = require('./routes/productRoutes');
const cartRouter = require('./routes/cartRoutes');
const orderRouter = require('./routes/orderRoutes');
const stripeRouter = require('./routes/stripeRoute');

// Middlewares
dotenv.config();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);
app.use('/api/checkout', stripeRouter);

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
