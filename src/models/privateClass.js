const mongoose = require('mongoose');
const moment = require('moment');

/**
 * @swagger
 * components:
 *   schemas:
 *     PrivateClass:
 *       type: object
 *       required:
 *         - students
 *         - date
 *         - startTime
 *         - endTime
 *       properties:
 *         students:
 *           type: array
 *           items:
 *             type: string
 *           description: List of student IDs
 *         date:
 *           type: string
 *           format: date
 *           description: Date of the private class
 *         startTime:
 *           type: string
 *           description: Start time of the private class (HH:MM)
 *         endTime:
 *           type: string
 *           description: End time of the private class (HH:MM)
 */
const privateClassSchema = new mongoose.Schema({
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    }],
    date: {
        type: Date,
        required: [true, 'Date is required'],
    },
    startTime: {
        type: String,
        required: [true, 'Start time is required'],
        match: [/^\d{2}:\d{2}$/, 'Please enter a valid start time (HH:MM)'],
    },
    endTime: {
        type: String,
        required: [true, 'End time is required'],
        match: [/^\d{2}:\d{2}$/, 'Please enter a valid end time (HH:MM)'],
    }
}, {timestamps: true});


privateClassSchema.pre(['save', 'updateOne', 'updateMany', 'findOneAndUpdate'], async function (next) {
    try {
        const startTime = moment(this.startTime, 'HH:mm');
        const endTime = moment(this.endTime, 'HH:mm');

        if (!startTime.isValid() || !endTime.isValid() || endTime.isSameOrBefore(startTime)) {
            throw new Error('Rango de tiempo inválido.');
        }

        // Validación de cruce de horarios
        const overlappingClass = await this.constructor.findOne({
            date: this.date,
            _id: {$ne: this._id}, // Excluir el documento actual en actualizaciones
            $or: [
                {startTime: {$lt: this.endTime}, endTime: {$gt: this.startTime}}
            ]
        });

        if (overlappingClass) {
            throw new Error('El horario entra en conflicto con otra clase particular.');
        }

        // Validación de cruce de horarios con CLASES GRUPALES
        const GroupClass = mongoose.model('Group');

        const diaDeLaSemana = moment(this.date).locale('es').format('dddd'); // Obtener día en español
        const diaDeLaSemanaCapitalizado = diaDeLaSemana.charAt(0).toUpperCase() + diaDeLaSemana.slice(1);


        const overlappingGroupClass = await GroupClass.findOne({
            daysOfWeek: {$in: diaDeLaSemanaCapitalizado}, // Usar día en español para la consulta
            $or: [
                {
                    schedule: {
                        $regex: `^${this.startTime}.*`
                    }
                },
                {
                    schedule: {
                        $regex: `.*-${this.endTime}$`
                    }
                },
                {
                    schedule: {
                        $regex: `.*${this.startTime}.*`
                    }
                },
                {
                    schedule: {
                        $regex: `.*${this.endTime}.*`
                    }
                }
            ]
        });

        console.log(overlappingGroupClass);

        if (overlappingGroupClass) {
            throw new Error('El horario entra en conflicto con una clase grupal.');
        }

        // Validación de estudiantes duplicados (movida a pre('validate'))
        if (new Set(this.students.map(String)).size !== this.students.length) {
            throw new Error('No se pueden agregar estudiantes duplicados.');
        }

        next();
    } catch (error) {
        next(error);
    }
});


module.exports = mongoose.model('PrivateClass', privateClassSchema);