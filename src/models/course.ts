import db from './db';
import Sequelize from 'sequelize';
import Batch from './batch';
import Subject from './subject';
const Course = db.define('course', {
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



export default Course;
