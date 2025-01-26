const Group = require('../models/groupClass');
const moment = require('moment');
const diasSemana = require("../constants/weekDays");
const {parseTimeRange} = require("../utils/utils");


exports.createGroup = async (groupData) => {
    const {name, description, daysOfWeek, schedule, maxMembers} = groupData;

    // Parsear las horas del rango de horario y guardarlas en minutos desde medianoche
    // para hacer más fácil la comparación
    const [startStr, endStr] = schedule.split(' - ');
    const startTime = moment(startStr, 'HH:mm');
    const endTime = moment(endStr, 'HH:mm');

    if (!startTime.isValid() || !endTime.isValid() || endTime.isSameOrBefore(startTime)) {
        throw new Error('Invalid schedule format or time range');
    }

    // Convertir las horas a minutos desde medianoche
    const startMinutes = startTime.hours() * 60 + startTime.minutes();
    const endMinutes = endTime.hours() * 60 + endTime.minutes();

    // Verificar si ya existe un grupo con el mismo nombre
    const groupNameExists = await Group.findOne({name: name});
    if (groupNameExists) {
        throw new Error('Group name already exists');
    }

    // Buscar grupos que tengan al menos un día en común
    const groupsWithCommonDays = await Group.find({
        daysOfWeek: {$in: daysOfWeek}
    });

    // Verificar cruces de horario para cada grupo encontrado
    for (const group of groupsWithCommonDays) {
        // Obtener los días en común entre el grupo existente y el nuevo
        const commonDays = group.daysOfWeek.filter(day => daysOfWeek.includes(day));

        if (commonDays.length === 0) continue;

        // Convertir el horario del grupo existente a minutos
        const [existingStartStr, existingEndStr] = group.schedule.split(' - ');
        const existingStart = moment(existingStartStr, 'HH:mm');
        const existingEnd = moment(existingEndStr, 'HH:mm');

        const existingStartMinutes = existingStart.hours() * 60 + existingStart.minutes();
        const existingEndMinutes = existingEnd.hours() * 60 + existingEnd.minutes();

        // Verificar si hay superposición de horarios
        const hasOverlap = !(endMinutes <= existingStartMinutes || startMinutes >= existingEndMinutes);

        if (hasOverlap) {
            throw new Error(`Schedule conflicts with group "${group.name}" on ${commonDays.join(', ')}`);
        }
    }

    // Crear el grupo si no hay conflicto
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

    // Buscar el grupo existente
    const existingGroup = await Group.findById(groupId);
    if (!existingGroup) {
        throw new Error('Group not found');
    }

    // Si se proporciona un nuevo nombre, verificar que no exista otro grupo con ese nombre
    if (name && name !== existingGroup.name) {
        const groupNameExists = await Group.findOne({name: name, _id: {$ne: groupId}});
        if (groupNameExists) {
            throw new Error('Another group with the same name already exists');
        }
    }

    // Verificar cruces de horario solo si se modifica el horario o los días
    if (schedule || daysOfWeek) {
        // Usar los valores nuevos o los existentes según corresponda
        const newSchedule = schedule || existingGroup.schedule;
        const newDaysOfWeek = daysOfWeek || existingGroup.daysOfWeek;

        // Parsear las horas del rango de horario y convertirlas a minutos
        const [startStr, endStr] = newSchedule.split(' - ');
        const startTime = moment(startStr, 'HH:mm');
        const endTime = moment(endStr, 'HH:mm');

        if (!startTime.isValid() || !endTime.isValid() || endTime.isSameOrBefore(startTime)) {
            throw new Error('Invalid schedule format or time range');
        }

        // Convertir las horas a minutos desde medianoche
        const startMinutes = startTime.hours() * 60 + startTime.minutes();
        const endMinutes = endTime.hours() * 60 + endTime.minutes();

        // Buscar grupos que tengan al menos un día en común, excluyendo el grupo actual
        const groupsWithCommonDays = await Group.find({
            _id: {$ne: groupId},
            daysOfWeek: {$in: newDaysOfWeek}
        });

        // Verificar cruces de horario para cada grupo encontrado
        for (const group of groupsWithCommonDays) {
            // Obtener los días en común entre el grupo existente y el actualizado
            const commonDays = group.daysOfWeek.filter(day => newDaysOfWeek.includes(day));

            if (commonDays.length === 0) continue;

            // Convertir el horario del grupo existente a minutos
            const [existingStartStr, existingEndStr] = group.schedule.split(' - ');
            const existingStart = moment(existingStartStr, 'HH:mm');
            const existingEnd = moment(existingEndStr, 'HH:mm');

            const existingStartMinutes = existingStart.hours() * 60 + existingStart.minutes();
            const existingEndMinutes = existingEnd.hours() * 60 + existingEnd.minutes();

            // Verificar si hay superposición de horarios
            const hasOverlap = !(endMinutes <= existingStartMinutes || startMinutes >= existingEndMinutes);

            if (hasOverlap) {
                throw new Error(`Schedule conflicts with group "${group.name}" on ${commonDays.join(', ')}`);
            }
        }
    }

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

exports.getGroupWithMembers = async (groupId) => {
    return Group.findById(groupId).populate('members');
}