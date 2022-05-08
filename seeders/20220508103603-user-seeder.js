'use strict';
const bcrypt = require('bcrypt');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'users',
            [
                {
                    name: 'Superadmin',
                    profession: 'Fullstack Developer',
                    role: 'admin',
                    email: 'admin@gmail.com',
                    password: await bcrypt.hash('password', 10),
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: 'Edi Kurniawan',
                    profession: 'Frontend Developer',
                    role: 'student',
                    email: 'student@gmail.com',
                    password: await bcrypt.hash('password', 10),
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {},
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('users', null, {});
    },
};
