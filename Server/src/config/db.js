const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        if (!process.env.DB_CONNECTION_STRING) throw new Error("Connection string not found");
        await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log("DB Connected");
    } catch (err) {
        throw new Error('DB CONNECTION ERROR:' + err);
    }
}

module.exports = { connectToDatabase }