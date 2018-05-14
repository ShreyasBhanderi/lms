"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./db"));
const sequelize_1 = __importDefault(require("sequelize"));
const teacher_1 = __importDefault(require("./teacher"));
const lecture_1 = __importDefault(require("./lecture"));
const Subject = db_1.default.define('subject', {
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
lecture_1.default.belongsTo(Subject);
lecture_1.default.belongsTo(teacher_1.default);
teacher_1.default.belongsTo(Subject);
Subject.hasMany(teacher_1.default, { as: 'Teachers' });
exports.default = Subject;
