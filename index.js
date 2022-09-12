const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('Database connected!'))
    .catch((err) => console.log(err));

app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.use('/zola/users', userRoute);
app.use('/zola/auth', authRoute);

app.listen(8000, () => {
    console.log('Backend sever is running!');
});
