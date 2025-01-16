const mongoose = require('mongoose');
const {GridFSBucket} = require('mongodb');
const {getGridFSBucketImages, getGridFSBucketDocuments} = require("../config/database");

class GridFSService {
    constructor() {
    }

    async uploadImageFile(file) {
        const bucket = getGridFSBucketImages();
        return new Promise((resolve, reject) => {
            // Crear un stream de escritura
            const uploadStream = bucket.openUploadStream(file.originalname, {
                contentType: file.mimetype
            });

            // Manejar eventos del stream
            uploadStream.on('error', reject);
            uploadStream.on('finish', () => resolve(uploadStream.id));

            // Escribir el archivo
            uploadStream.write(file.buffer);
            uploadStream.end();
        });
    }


    async getImageFile(fileId) {
        const bucket = getGridFSBucketImages();
        if (!mongoose.Types.ObjectId.isValid(fileId)) {
            throw new Error('ID de archivo inválido');
        }

        return bucket.find({_id: new mongoose.Types.ObjectId(fileId)}).next();
    }

    getImageDownloadStream(fileId) {
        const bucket = getGridFSBucketImages();
        return bucket.openDownloadStream(new mongoose.Types.ObjectId(fileId));
    }

    async deleteImageFile(fileId) {
        const bucket = getGridFSBucketImages();
        return bucket.delete(new mongoose.Types.ObjectId(fileId));
    }

    async uploadDocumentFile(file) {
        const bucket = getGridFSBucketDocuments();
        return new Promise((resolve, reject) => {
            // Crear un stream de escritura
            const uploadStream = bucket.openUploadStream(file.originalname, {
                contentType: file.mimetype,
                metadata: {
                    originalName: file.originalname,
                    uploadDate: new Date()
                }
            });

            // Manejar eventos del stream
            uploadStream.on('error', reject);
            uploadStream.on('finish', () => resolve(uploadStream.id));

            // Escribir el archivo
            uploadStream.write(file.buffer);
            uploadStream.end();
        });
    }

    async getDocumentFile(fileId) {
        const bucket = getGridFSBucketDocuments();
        if (!mongoose.Types.ObjectId.isValid(fileId)) {
            throw new Error('ID de archivo inválido');
        }

        return bucket.find({_id: new mongoose.Types.ObjectId(fileId)}).next();
    }

    getDocumentDownloadStream(fileId) {
        const bucket = getGridFSBucketDocuments();
        return bucket.openDownloadStream(new mongoose.Types.ObjectId(fileId));
    }

    async deleteDocumentFile(fileId) {
        const bucket = getGridFSBucketDocuments();
        return bucket.delete(new mongoose.Types.ObjectId(fileId));
    }
}

module.exports = new GridFSService();