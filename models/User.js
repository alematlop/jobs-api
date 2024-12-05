const { DataTypes } = require("sequelize");
const sequelize = require('../db/connect.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please provide name',
            },
            len: {
                args: [3, 50],
                msg: 'Name must be between 3 and 50 characters long',
            },
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: 'Email address must be unique',
        },
        validate: {
            notNull: {
                msg: 'Please provide valid email address',
            },
            isEmail: {
                msg: 'Email address is not valid',
            },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please provide password',
            },
            len: {
                args: [6],
                msg: 'Password must be at least 6 characters long',
            },
        },
    },
}, {
    hooks: {
        beforeCreate: async (user) => {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        },
    },
});



User.prototype.createJWT = function () {
    return jwt.sign({userId:this.id, name:this.name}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES,
    })
}

User.prototype.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}

// User.prototype.validPassword = async function (password) {
//     return await bcrypt.compare(password, this.password);
// };

module.exports = User;