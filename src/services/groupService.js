const Group = require('../models/group');

exports.createGroup = async (groupData) => {

    const {name, description, daysOfWeek, schedule, maxMembers} = groupData;
    const group = new Group({name, description, daysOfWeek, schedule, maxMembers});

    // If groupName exists, throw an error
    const groupNameExists = await Group.find({name: name});
    if (groupNameExists.length > 0) {
        throw new Error('Group name already exists');
    }

    await group.save();
    return group;

}

exports.updateGroup = async (id, groupData) => {
    const group = await Group.findById(id);
    if (!group) {
        throw new Error('Group not found');
    }

    Object.assign(group, groupData);
    await group.save();
    return group;
}

exports.addStudentToGroup = async (groupId, studentId) => {
    const group = await Group.findById(groupId);
    if (!group) {
        throw new Error('Group not found');
    }
    if (group.members.includes(studentId)) {
        throw new Error('Student already in group');
    }
    group.members.push(studentId);
    await group.save();
    return group;
}
