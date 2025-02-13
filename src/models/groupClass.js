const mongoose = require('mongoose');
const moment = require("moment");

/**
 * @swagger
 * components:
 *   schemas:
 *     GroupClass:
 *       type: object
 *       required:
 *         - name
 *         - daysOfWeek
 *         - schedule
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the group
 *         description:
 *           type: string
 *           description: The description of the group
 *         members:
 *           type: array
 *           items:
 *             type: string
 *           description: The members of the group
 *         daysOfWeek:
 *           type: array
 *           items:
 *             type: string
 *           description: The days of the week the group meets
 *           example: ["Monday", "Wednesday", "Friday"]
 *         maxMembers:
 *           type: number
 *           description: The maximum number of members the group can have
 *           example: 10
 *         schedule:
 *           type: string
 *           description: The schedule of the group
 */
const groupClassSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
    },
    description: {
        type: String,
        required: false,
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    }],
    daysOfWeek: {
        type: [String],
        required: [true, 'Days of the week are required'],
    },
    maxMembers: {
        type: Number,
        required: [true, 'Max members is required'],
    },
    schedule: {
        type: String,
        required: [true, 'Schedule is required'],
        match: [/^\d{2}:\d{2} - \d{2}:\d{2}$/, 'Please enter a valid time range (HH:MM - HH:MM)'],
    }
}, {timestamps: true});

groupClassSchema.methods.getStartTime = function () {
    const [start] = this.schedule.split(' - ');
    return start;
};

groupClassSchema.methods.getEndTime = function () {
    const [, end] = this.schedule.split(' - ');
    return end;
};

groupClassSchema.pre(['save', 'updateOne', 'updateMany', 'findOneAndUpdate'], async function (next) {
    try {
        const [startStr, endStr] = this.schedule.split(' - ');
        const startTime = moment(startStr, 'HH:mm');
        const endTime = moment(endStr, 'HH:mm');

        if (!startTime.isValid() || !endTime.isValid() || endTime.isSameOrBefore(startTime)) {
            throw new Error('Formato de horario inválido o rango de tiempo incorrecto');
        }

        const query = {
            daysOfWeek: {$in: this.daysOfWeek},
            _id: {$ne: this._id} // Excluir el documento actual en actualizaciones
        };

        const overlappingGroups = await this.constructor.find(query);

        for (const otherGroup of overlappingGroups) {
            const [otherStartStr, otherEndStr] = otherGroup.schedule.split(' - ');
            const otherStartTime = moment(otherStartStr, 'HH:mm');
            const otherEndTime = moment(otherEndStr, 'HH:mm');

            const commonDays = this.daysOfWeek.filter(day => otherGroup.daysOfWeek.includes(day));

            if (commonDays.length > 0) { // Solo verificar si hay días en común
                const overlap = !(endTime.isSameOrBefore(otherStartTime) || startTime.isSameOrAfter(otherEndTime));

                if (overlap) {
                    throw new Error(`El horario entra en conflicto con el grupo "${otherGroup.name}" en los días ${commonDays.join(', ')}`);
                }
            }
        }

        // Validación de cruce de horarios con CLASES PRIVADAS
        const PrivateClass = mongoose.model('PrivateClass');

        const overlappingPrivateClass = await PrivateClass.findOne({
            date: {
                $gte: moment(this.getStartTime(), "HH:mm").toDate(),
                $lte: moment(this.getEndTime(), "HH:mm").toDate()
            },
            $or: [
                {startTime: {$lt: this.getEndTime()}, endTime: {$gt: this.getStartTime()}}
            ]
        });

        if (overlappingPrivateClass) {
            throw new Error('El horario entra en conflicto con una clase privada.');
        }

        next();
    } catch (error) {
        next(error);
    }
});


const GroupClass = mongoose.model('Group', groupClassSchema); // It would be better to use 'GroupClass' instead of 'Group'
module.exports = GroupClass;