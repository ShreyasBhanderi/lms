import db from './db';
import  Sequelize from 'sequelize';
import Teacher from './teacher';
import Lecture from './lecture';
const Subject = db.define('subject', {
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
Lecture.belongsTo(Subject)
Lecture.belongsTo(Teacher)
Teacher.belongsTo(Subject)
Subject.hasMany(Teacher,{as: 'Teachers'})

export default Subject;