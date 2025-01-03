const GroupService = require('../services/groupService');
const Group = require('../models/group');

exports.createGroup = async (req, res) => {
    try {
        const group = await GroupService.createGroup(req.body);
        res.status(201).json(group);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.getGroups = async (req, res) => {
    try {
        const groups = await Group.find(req.query);
        res.status(200).json(groups);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}