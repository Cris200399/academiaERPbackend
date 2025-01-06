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
        const groups = await Group.find(req.query).populate('members');
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
        const { groupId, studentId } = req.params;
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        if (group.members.includes(studentId)) {
            return res.status(400).json({ message: 'Student is already a member of the group' });
        }
        group.members.push(studentId);
        await group.save();
        res.status(200).json(group);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}