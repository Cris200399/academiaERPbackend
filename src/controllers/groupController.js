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

exports.deleteGroup = async (req, res) => {
    try {
        await GroupService.deleteGroup(req.params.id);
        res.status(204).send();
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

exports.updateGroup = async (req, res) => {
    try {
        const group = await GroupService.updateGroup(req.params.id, req.body);
        res.status(200).json(group);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.addStudentToGroup = async (req, res) => {
    try {
        const {groupId, studentId} = req.params;
        const group = await GroupService.addStudentToGroup(groupId, studentId);
        res.status(200).json(group);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.updateGroupInfo = async (req, res) => {
    try {
        const group = await GroupService.updateGroupInfo(req.params.id, req.body);
        res.status(200).json(group);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}