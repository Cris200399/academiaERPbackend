const diasSemana = require("../constants/weekDays");
const formatDate = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
};

const getAge = (dateFormated) => {
    dateFormated = new Date(dateFormated);
    const diffMs = Date.now() - dateFormated.getTime();
    const ageDate = new Date(diffMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

// Función auxiliar para convertir el formato "HH:mm - HH:mm" a objetos de tiempo
const parseTimeRange = (timeString) => {
    const [start, end] = timeString.split(' - ');
    return {
        start: {
            hours: parseInt(start.split(':')[0]),
            minutes: parseInt(start.split(':')[1])
        },
        end: {
            hours: parseInt(end.split(':')[0]),
            minutes: parseInt(end.split(':')[1])
        }
    };
};

const getClassDateTime = (schedule, dayOfWeek) => {
    // Parse el horario (ejemplo: "15:00 - 17:00")
    const [startTime, endTime] = schedule.split(' - ');
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    // Obtener la fecha actual
    const today = new Date();

    // Encontrar el próximo día de la semana para la clase
    const targetDay = diasSemana[dayOfWeek];
    const currentDay = today.getDay();
    const daysUntilTarget = (targetDay + 7 - currentDay) % 7;

    // Crear la fecha para la clase
    const classDate = new Date(today);
    classDate.setDate(today.getDate() + daysUntilTarget);

    // Crear fechas con horarios de inicio y fin
    const startDateTime = new Date(classDate);
    startDateTime.setHours(startHour, startMinute, 0);

    const endDateTime = new Date(classDate);
    endDateTime.setHours(endHour, endMinute, 0);

    return {
        start: startDateTime.toISOString(),
        end: endDateTime.toISOString()
    };
}


module.exports = {formatDate, getAge, parseTimeRange, getClassDateTime};