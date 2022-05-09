const bcrypt = require('bcrypt');
const { User } = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
    const schema = {
        email: {
            type: 'email',
            empty: false,
        },
        password: {
            type: 'string',
            min: 6,
            empty: false,
        },
    };

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res.status(400).json({
            success: false,
            message: validate,
        });
    }

    const userFound = await User.findOne({
        where: {
            email: req.body.email,
        },
    });

    if (!userFound) {
        return res.status(400).json({
            success: false,
            message: 'User not found',
        });
    }

    const passwordMatch = await bcrypt.compare(
        req.body.password,
        userFound.password,
    );

    if (!passwordMatch) {
        return res.status(400).json({
            success: false,
            message: 'Data not valid',
        });
    }

    return res.json({
        status: 'success',
        message: 'Login success',
        data: userFound,
    });
};
