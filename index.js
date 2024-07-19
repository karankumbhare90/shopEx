const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const { connect } = require('./config/DB');
const authRoutes = require('./routes/authRoute'); // Note the change from destructuring to direct import
const categoryRoute = require('./routes/categoryRoute'); // Note the change from destructuring to direct import
const productRoute = require('./routes/productRoute'); // Note the change from destructuring to direct import

const app = express();

// Config env
require('dotenv').config();

// Database Config
connect();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Router
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoute);
app.use("/api/v1/product", productRoute);

// Rest API
app.get('/', (req, res) => {
    res.send({
        message: 'Welcome to E-commerce App'
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on PORT ${process.env.PORT}`);
});
