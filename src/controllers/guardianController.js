const GuardianService = require('../services/guardianService');

exports.getGuardians = async (req, res) => {
    try {
        const guardians = await GuardianService.getGuardians();
        res.status(200).json(guardians);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}