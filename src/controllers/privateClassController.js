const PrivateClassService = require('../services/privateClassService');

exports.createPrivateClass = async (req, res) => {
    try {
        const newPrivateClass = await PrivateClassService.createPrivateClass(req.body);
        res.status(201).json(newPrivateClass);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.updatePrivateClass = async (req, res) => {
    try {
        const updatedPrivateClass = await PrivateClassService.updatePrivateClass(req.params.id, req.body);
        res.status(200).json(updatedPrivateClass);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.getPrivateClasses = async (req, res) => {
    try {
        const privateClasses = await PrivateClassService.getPrivateClasses(req.query);
        res.status(200).json(privateClasses);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.getPrivateClassById = async (req, res) => {
    try {
        const privateClass = await PrivateClassService.getPrivateClassById(req.params.id);
        res.status(200).json(privateClass);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.deletePrivateClass = async (req, res) => {
    try {
        await PrivateClassService.deletePrivateClass(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}