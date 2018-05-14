import db from './db';
import  Sequelize from 'sequelize';
import Batch from './batch';
const Student = db.define('student', {
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

export default Student;