const mongoose = require('mongoose');
const {GridFSBucket} = require('mongodb');
const {getGridFSBucket} = require("../config/database");

class GridFSService {
    constructor() {
    }

    async uploadFile(file) {
        const bucket = getGridFSBucket();
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

    async getFile(fileId) {
        const bucket = getGridFSBucket();
        if (!mongoose.Types.ObjectId.isValid(fileId)) {
            throw new Error('ID de archivo inválido');
        }

        return bucket.find({_id: new mongoose.Types.ObjectId(fileId)}).next();
    }

    getDownloadStream(fileId) {
        const bucket = getGridFSBucket();
        return bucket.openDownloadStream(new mongoose.Types.ObjectId(fileId));
    }

    async deleteFile(fileId) {
        const bucket = getGridFSBucket();
        return bucket.delete(new mongoose.Types.ObjectId(fileId));
    }
}

module.exports = new GridFSService();