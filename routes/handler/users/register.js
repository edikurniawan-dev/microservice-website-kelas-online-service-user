require('dotenv').config();
const { User, RefreshToken } = require('../../../models');
const Validator = require('fastest-validator');
const bcrypt = require('bcrypt');
const v = new Validator();

module.exports = async (req, res) => {
    const schema = {
        name: {
            type: 'string',
            empty: false,
        },
        email: {
            type: 'email',
            empty: false,
        },
        password: {
            type: 'string',
            min: 6,
            empty: false,
        },
        profession: {
            type: 'string',
            optional: true,
        },
    };

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res.status(400).json({
            success: false,
            message: validate,
        });
    }

    const user = await User.findOne({
        where: {
            email: req.body.email,
        },
    });

    if (user) {
        return res.status(400).json({
            success: false,
            message: 'User already exists',
        });
    }

    const password = await bcrypt.hash(req.body.password, 10);
    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: password,
        profession: req.body.profession,
        role: 'student',
    };

    const userCreated = await User.create(userData);

    return res.json({
        status: 'success',
        data: userCreated,
    });
};
