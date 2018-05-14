import db from './db';
import Sequelize from 'sequelize';
import Subject from './Subject';
const Teacher = db.define('teacher', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

export default Teacher;