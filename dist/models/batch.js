"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./db"));
const sequelize_1 = __importDefault(require("sequelize"));
const Student_1 = __importDefault(require("./Student"));
const course_1 = __importDefault(require("./course"));
const lecture_1 = __importDefault(require("./lecture"));
const Subject_1 = __importDefault(require("./Subject"));
const teacher_1 = __importDefault(require("./teacher"));
const Batch = db_1.default.define('batch', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
lecture_1.default.belongsTo(Batch);
Subject_1.default.belongsTo(course_1.default);
Batch.belongsToMany(Student_1.default, { as: 'Student', through: 'batch_student', foreignKey: 'batchId' });
Batch.belongsToMany(teacher_1.default, { as: 'Teacher', through: 'batch_teacher', foreignKey: 'batchId' });
teacher_1.default.belongsToMany(Batch, { as: 'Batch', through: 'batch_teacher', foreignKey: 'teacherId' });
Batch.hasMany(lecture_1.default, { as: 'Lecture' });
Student_1.default.belongsToMany(Batch, { as: 'Batch', through: 'batch_student', foreignKey: 'studentId' });
Batch.belongsTo(course_1.default);
course_1.default.hasMany(Batch, { as: 'Batch' });
course_1.default.hasMany(Subject_1.default, { as: 'Subject' });
exports.default = Batch;
