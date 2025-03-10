const cron = require('node-cron');
const Student = require('../models/student');
const GroupClassPayment = require('../models/groupClassPayment');

// Función para actualizar el estado de los alumnos según el estado de pago
const updateStudentsPaymentStatus = async () => {
    try {
        console.log('Ejecutando tarea de actualización de pagos...');

        const activeStudents = await Student.find({status: 'activo'});
        const today = new Date();


        for (const student of activeStudents) {
            await updateStudentPaymentStatus(today, student);
        }

        console.log(`Actualizados ${activeStudents.length} alumnos.`);
    } catch (error) {
        console.error('Error actualizando el estado de los alumnos:', error);
    }
};

const updateStudentPaymentStatus = async (today, student) => {
    const payments = await GroupClassPayment.find({student: student._id}).sort({endDate: -1}).limit(1);
    if (payments.length > 0) {
        const latestPayment = payments[0];
        const daysDifference = (latestPayment.endDate - today) / (1000 * 60 * 60 * 24);

        let paymentStatus;
        if (daysDifference < 0) {
            paymentStatus = 'vencido';
        } else if (daysDifference <= 5) {
            paymentStatus = 'por_vencer';
        } else {
            paymentStatus = 'al_día';
        }

        student.paymentStatus = paymentStatus;
        await student.save();
    } else {
        student.paymentStatus = 'sin_pago';
        await student.save();
    }

}

// Programar la tarea para que se ejecute todos los días a las 00:00
cron.schedule('0 0 * * *', updateStudentsPaymentStatus, {
// cron.schedule('*/10 * * * * *', updateStudentsPaymentStatus, {
    scheduled: true,
    timezone: "America/Lima"
});

module.exports = {updateStudentsPaymentStatus, updateStudentPaymentStatus};