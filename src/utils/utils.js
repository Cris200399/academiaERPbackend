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


module.exports = {formatDate, getAge, parseTimeRange};