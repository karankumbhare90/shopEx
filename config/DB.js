require('dotenv').config();
const mongoose = require('mongoose');

const connect = async () => {
    try {
        const conn = await mongoose.connect(process.env.CONNECTION_URL);
        console.log(`Connected to Database, ${conn.connection.host}`);
    }
    catch (err) {
        console.log('Error while connecting');
    }
}

module.exports = {
    connect
}