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

module.exports = {formatDate, getAge};