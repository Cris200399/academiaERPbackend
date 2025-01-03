const Group = require('../models/group');

exports.createGroup = async (groupData) => {

    const {name, description, daysOfWeek, schedule} = groupData;
    const group = new Group({name, description, daysOfWeek, schedule});

    // If groupName exists, throw an error
    const groupNameExists = await Group.find({name: name});
    if (groupNameExists.length > 0) {
        throw new Error('Group name already exists');
    }

    await group.save();
    return group;

}
