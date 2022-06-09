const { User } = require('../../../models');

module.exports = async (req, res) => {
    const id = req.params.id;
    const user = await User.findByPk(id, {
        attributes: ['id', 'name', 'email', 'role', 'profession', 'avatar'],
    });
    if (!user) {
        return res.status(400).json({
            status: 'error',
            message: 'User not found',
        });
    }

    return res.json({
        status: 'success',
        message: 'Get user success',
        data: user,
    });
};
