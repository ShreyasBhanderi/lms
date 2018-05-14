import db from './db';
import Sequelize from 'sequelize';
import Student from './Student';
import Course from './course';
import Lecture from './lecture';
import Subject from './Subject';
import Teacher from './teacher';
const Batch = db.define('batch', {
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
Lecture.belongsTo(Batch)
Subject.belongsTo(Course)
Batch.belongsToMany(Student, { as: 'Student', through: 'batch_student', foreignKey: 'batchId' })
Batch.belongsToMany(Teacher, { as: 'Teacher', through: 'batch_teacher', foreignKey: 'batchId' })
Teacher.belongsToMany(Batch, { as: 'Batch', through: 'batch_teacher', foreignKey: 'teacherId' })
Batch.hasMany(Lecture,{as: 'Lectures'})
Student.belongsToMany(Batch, { as: 'Batch', through: 'batch_student', foreignKey: 'studentId' })
Batch.belongsTo(Course)
Course.hasMany(Batch,{as: 'Batch'})
Course.hasMany(Subject,{as: 'Subjects'})

export default Batch;