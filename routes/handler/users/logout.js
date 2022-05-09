const { User, RefreshToken } = require('../../../models');

module.exports = async (req, res) => {
    const userId = req.body.user_id;
    const user = await User.findByPk(userId);

    if (!user) {
        return res.status(404).json({
            status: 'salah',
            message: 'user not found',
        });
    }

    await RefreshToken.destroy({
        where: {
            userId: userId,
        },
    });

    return res.json({
        status: 'success',
        message: 'logout success',
        data: [user.id],
    });
};
