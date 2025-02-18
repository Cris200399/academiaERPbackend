const mongoose = require('mongoose');
const {GridFSBucket} = require("mongodb");


let gridfsBucketImages = null;
let gridfsBucketDocuments = null;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        gridfsBucketImages = await new GridFSBucket(mongoose.connection.db, {
            bucketName: 'images'
        });

        gridfsBucketDocuments = await new GridFSBucket(mongoose.connection.db, {
            bucketName: 'documents'
        });

        console.log('MongoDB conectado');
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
};

const getGridFSBucketImages = () => {
    if (!gridfsBucketImages) {
        throw new Error('GridFS no está inicializado');
    }
    return gridfsBucketImages;
};

const getGridFSBucketDocuments = () => {
    if (!gridfsBucketDocuments) {
        throw new Error('GridFS no está inicializado');
    }
    return gridfsBucketDocuments;
};

module.exports = {connectDB, getGridFSBucketImages, getGridFSBucketDocuments};