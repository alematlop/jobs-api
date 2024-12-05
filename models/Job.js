const { DataTypes } = require("sequelize");
const sequelize = require('../db/connect.js');
const User = require('../models/User');

const Job = sequelize.define('Job', {
    company: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Company name is required'
            },
            len: {
                args: [1, 50],
                msg: 'Company name must be between 1 and 50 characters'
            }
        }
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Position is required'
            },
            len: {
                args: [1, 100],
                msg: 'Position must be between 1 and 100 characters'
            }
        }
    },
    status:{
        type: DataTypes.ENUM('interview', 'declined', 'pending'),
        defaultValue: 'pending',
        allowNull: false
    },
    createdBy:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notNull: {
                msg: 'Please provide user'
            }
        },
        references: {
            model: User,
            key: 'id'
        }
    }
});

User.hasMany(Job, {foreignKey: 'createdBy'});
Job.belongsTo(User, { foreignKey: 'createdBy' });

module.exports = Job;