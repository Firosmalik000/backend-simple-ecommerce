const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const productRouter = require('./routes/productRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const userRouter = require('./routes/userRoutes');
const adressRouter = require('./routes/adressRoutes');
const tagRouter = require('./routes/tagRoutes');
const cartRouter = require('./routes/cartRouter');
const orderRouter = require('./routes/orderRoutes');
const invoiceRouter = require('./model/invoiceModel');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();

dotenv.config();

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
);
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json());
// url encode
app.use(express.urlencoded({ extended: true }));

// router
app.use('/api/product', productRouter);
app.use('/api/category', categoryRouter);
app.use('/api/auth', userRouter);
app.use('/api/adress', adressRouter);
app.use('/api/tag', tagRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/invoice', invoiceRouter);

// port
const port = process.env.PORT || 5000;

mongoose
  .connect(
    'mongodb://root:root123@ac-ufjoenx-shard-00-00.wv5qisj.mongodb.net:27017,ac-ufjoenx-shard-00-01.wv5qisj.mongodb.net:27017,ac-ufjoenx-shard-00-02.wv5qisj.mongodb.net:27017/eduwork-commerce?ssl=true&replicaSet=atlas-xeklsr-shard-0&authSource=admin&retryWrites=true&w=majority'
  )
  .then(() => console.log('Terhubung ke MongoDB Atlas'))
  .catch((err) => console.error('Kesalahan koneksi:', err));

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
