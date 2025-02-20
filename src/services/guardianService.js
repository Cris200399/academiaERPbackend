const Guardian = require('../models/guardian');

exports.getGuardians = async () => {
    return Guardian.find();
}