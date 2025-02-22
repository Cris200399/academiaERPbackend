const GroupService = require('../services/groupClassService');
const Group = require('../models/groupClass');

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

exports.getAvailableGroups = async (req, res) => {
    try {
        const groups = await GroupService.getAvailableGroups();
        res.status(200).json(groups);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.getGroupInProgress = async (req, res) => {
    try {
        const groups = await GroupService.getGroupInProgress();
        res.status(200).json(groups);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.getGroupWithMembers = async (req, res) => {
    try {
        const group = await GroupService.getGroupWithActiveMembers(req.params.id);
        res.status(200).json(group);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.getTodayGroupActivities = async (req, res) => {
    try {
        const activities = await GroupService.getTodayGroupActivities();
        res.status(200).json(activities);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.getWeekGroupActivities = async (req, res) => {
    try {
        const activities = await GroupService.getWeekGroupActivities();
        res.status(200).json(activities);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}