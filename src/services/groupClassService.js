const Group = require('../models/groupClass');
const moment = require('moment');
const diasSemana = require("../constants/weekDays");
const {parseTimeRange, getClassDateTime} = require("../utils/utils");


exports.createGroup = async (groupData) => {
    const {name, description, daysOfWeek, schedule, maxMembers} = groupData;

    const group = new Group({
        name,
        description,
        daysOfWeek,
        schedule,
        maxMembers,
    });

    await group.save();
    return group;
};

exports.updateGroup = async (groupId, updatedData) => {
    const {name, description, daysOfWeek, schedule, maxMembers} = updatedData;
    const existingGroup = await Group.findById(groupId);

    // Actualizar los campos proporcionados
    if (name) existingGroup.name = name;
    if (description) existingGroup.description = description;
    if (daysOfWeek) existingGroup.daysOfWeek = daysOfWeek;
    if (schedule) existingGroup.schedule = schedule;
    if (maxMembers !== undefined) existingGroup.maxMembers = maxMembers;

    // Guardar los cambios
    await existingGroup.save();
    return existingGroup;
};

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

exports.deleteGroup = async (groupId) => {
    const existGroup = await Group.findById(groupId);
    if (!existGroup) {
        throw new Error('Group not found');
    }

    if (existGroup.members.length > 0) {
        throw new Error('Group has members');
    }

    await Group.deleteOne({_id: groupId});
}

exports.updateGroupInfo = async (groupId, groupData) => {
    const existGroup = await Group.findById(groupId);
    if (!existGroup) {
        throw new Error('Group not found');
    }
    const {name, description, daysOfWeek, schedule, maxMembers} = groupData;
    existGroup.name = name;
    existGroup.description = description;
    existGroup.daysOfWeek = daysOfWeek;
    existGroup.schedule = schedule;
    existGroup.maxMembers = maxMembers;
    await existGroup.save();
    return existGroup;


}

exports.getAvailableGroups = async () => {
    return Group.find({$expr: {$lt: [{$size: "$members"}, "$maxMembers"]}});
}

exports.getGroupInProgress = async () => {
    const now = moment();
    const currentDay = now.day();

    // Primero obtenemos todos los grupos que coinciden con el día actual
    const groups = await Group.find({
        daysOfWeek: {
            $in: [Object.keys(diasSemana).find(key => diasSemana[key] === currentDay)]
        }
    }).populate('members');

    // Luego filtramos por horario en memoria
    const groupInProgress = groups.find(group => {
        const timeRange = parseTimeRange(group.schedule);
        const currentHour = now.hours();
        const currentMinute = now.minutes();

        // Convertir a minutos para hacer la comparación más fácil
        const currentTimeInMinutes = (currentHour * 60) + currentMinute;
        const startTimeInMinutes = (timeRange.start.hours * 60) + timeRange.start.minutes;
        const endTimeInMinutes = (timeRange.end.hours * 60) + timeRange.end.minutes;

        return currentTimeInMinutes >= startTimeInMinutes &&
            currentTimeInMinutes <= endTimeInMinutes;
    });

    return groupInProgress || null;
};

exports.getGroupWithActiveMembers = async (groupId) => {
    const group = await Group.findById(groupId).populate('members');
    if (!group) {
        throw new Error('Group not found');
    }
    const activeMembers = group.members.filter(member => member.status === 'activo');
    return {
        ...group.toObject(),
        members: activeMembers
    };
};

exports.getTodayGroupActivities = async () => {
    const now = moment();
    const currentDay = now.day();

    const groups = await Group.find({
        daysOfWeek: {
            $in: [Object.keys(diasSemana).find(key => diasSemana[key] === currentDay)]
        }
    });

    return groups.map(group => {
        const timeRange = parseTimeRange(group.schedule, currentDay);
        return {
            ...group.toObject(),
            timeRange
        };
    });
}

exports.getWeekGroupActivities = async () => {

    const groups = await Group.find();

    return groups.map(group => {
        const timeRange = group.daysOfWeek.map(day => {
            return getClassDateTime(group.schedule, day);
        });
        return {
            ...group.toObject(),
            timeRange
        };
    });
}

exports.removeStudentFromGroup = async (groupId, studentId) => {
    const group = await Group.findById(groupId);
    if (!group) {
        throw new Error('Group not found');
    }
    group.members = group.members.filter(member => member.toString() !== studentId);
    await group.save();
    return group;
}