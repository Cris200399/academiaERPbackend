const mongoose = require('mongoose');
const {GridFSBucket} = require("mongodb");


let gridfsBucket = null;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        gridfsBucket = await new GridFSBucket(mongoose.connection.db, {
            bucketName: 'uploads'
        });

        console.log('MongoDB conectado');
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
};

const getGridFSBucket = () => {
    if (!gridfsBucket) {
        throw new Error('GridFS no está inicializado');
    }
    return gridfsBucket;
};

module.exports = {connectDB, getGridFSBucket};