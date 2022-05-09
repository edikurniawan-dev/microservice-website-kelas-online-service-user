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
        avatar: {
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

    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'User not found',
        });
    }

    const email = req.body.email;
    if (email) {
        const checkEmail = await User.findOne({
            where: {
                email: email,
            },
        });

        if (checkEmail && email !== user.email) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists',
            });
        }
    }

    const password = req.body.password;
    const passwordHash = await bcrypt.hash(password, 10);
    const { name, profession, avatar } = req.body;

    await user.update({
        name,
        email,
        passwordHash,
        profession,
        avatar,
    });

    return res.json({
        status: 'success',
        message: 'User updated',
        data: user,
    });
};
