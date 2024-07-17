const userModel = require('../models/userModel');

const testConn = async (req, res) => {
    try {
        const users = await userModel.find();
        res.send(`Connected`)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { testConn };