const PrivateClass = require('../models/privateClass');
const PrivateClassPayment = require('../models/privateClassPayment');


exports.getPrivateClassAndTheirPrivatePayments = async (query) => {
    const privateClasses = await PrivateClass.find().populate('students'); // Popula los estudiantes


    const privateClassesWithPayments = await Promise.all(
        privateClasses.map(async (privateClass) => {
            const privateClassId = privateClass._id.toString();
            const payments = await PrivateClassPayment.find({privateClass: privateClassId}).populate('student', '_id name lastName'); // Popula solo el ID y el nombre de los estudiantes
            return {
                ...privateClass.toObject(), // Convierte el documento Mongoose a un objeto para agregar propiedades
                payments,
            };
        })
    );

    return privateClassesWithPayments;
}