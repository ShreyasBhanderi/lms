"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const courses_1 = __importDefault(require("./courses"));
const subjects_1 = __importDefault(require("./subjects"));
const students_1 = __importDefault(require("./students"));
const teachers_1 = __importDefault(require("./teachers"));
class Route {
    constructor() {
        this.route = express_1.Router();
        this.routes();
    }
    routes() {
        this.route.use('/courses', courses_1.default);
        this.route.use('/subjects', subjects_1.default);
        this.route.use('/teachers', teachers_1.default);
        this.route.use('/students', students_1.default);
    }
}
exports.default = new Route().route;
