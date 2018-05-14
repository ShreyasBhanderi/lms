import db from './db';
import Sequelize from 'sequelize';
import Subject from './Subject';
import Teacher from './teacher';
const Lecture = db.define('lecture', {
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


export default Lecture;