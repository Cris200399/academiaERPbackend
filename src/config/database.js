const mongoose = require('mongoose');
const {GridFSBucket} = require("mongodb");


let gridFsBucketImages = null;
let gridFsBucketDocuments = null;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        gridFsBucketImages = await new GridFSBucket(mongoose.connection.db, {
            bucketName: 'images'
        });

        gridFsBucketDocuments = await new GridFSBucket(mongoose.connection.db, {
            bucketName: 'documents'
        });

        console.log('MongoDB conectado');
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
};

const getGridFSBucketImages = () => {
    if (!gridFsBucketImages) {
        throw new Error('GridFS no está inicializado');
    }
    return gridFsBucketImages;
};

const getGridFSBucketDocuments = () => {
    if (!gridFsBucketDocuments) {
        throw new Error('GridFS no está inicializado');
    }
    return gridFsBucketDocuments;
};

module.exports = {connectDB, getGridFSBucketImages, getGridFSBucketDocuments};