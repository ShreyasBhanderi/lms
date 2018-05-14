"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subject_1 = __importDefault(require("../models/subject"));
const teacher_1 = __importDefault(require("../models/teacher"));
class SubjectRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    all(req, res) {
        subject_1.default.findAll()
            .then((data) => {
            res.status(200).json({ data });
        })
            .catch((error) => {
            res.status(500).json({ error });
        });
    }
    allTeachers(req, res) {
        const id = req.params.id;
        subject_1.default.findOne({ where: {
                id: id
            }
        })
            .then((data) => {
            {
                data.getTeachers({ attributes: ['name'] }).then((data) => { res.status(200).json(data); });
            }
        })
            .catch((error) => {
            res.status(500).json({ error });
        });
    }
    addTeacher(req, res) {
        const id = req.params.id;
        subject_1.default.findOne({ where: {
                id: id
            }
        })
            .then((data) => {
            teacher_1.default.findOne({
                where: {
                    name: req.body.name
                }
            }).then(function (obj) {
                if (obj) { // update
                    return obj.update({ name: req.body.name });
                }
                else { // insert
                    return teacher_1.default.create({ name: req.body.name });
                }
            }).then((obj) => { data.addTeachers(obj); res.status(500).json({ obj }); });
        })
            .catch((error) => {
            res.status(500).json({ error });
        });
    }
    one(req, res) {
        const id = req.params.id;
        subject_1.default.findOne({ where: {
                id: id
            }
        })
            .then((data) => {
            res.status(200).json({ data });
        })
            .catch((error) => {
            res.status(500).json({ error });
        });
    }
    create(req, res) {
        const name = req.body.name;
        const course = new subject_1.default({
            name
        });
        course.save()
            .then((data) => {
            res.status(201).json({ data });
        })
            .catch((error) => {
            res.status(500).json({ error });
        });
    }
    update(req, res) {
        const id = req.params.id;
        subject_1.default.update({ name: req.body.name }, { where: {
                id: id
            }
        })
            .then((data) => {
            res.status(200).json({ data });
        })
            .catch((error) => {
            res.status(500).json({ error });
        });
    }
    delete(req, res) {
        const id = req.params.id;
        subject_1.default.destroy({ where: {
                id: id
            }
        })
            .then(() => {
            res.status(204).end();
        })
            .catch((error) => {
            res.status(500).json({ error });
        });
    }
    // set up our routes
    routes() {
        this.router.get('/', this.all);
        this.router.get('/:id', this.one);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
        this.router.get('/:id/teachers', this.allTeachers);
        this.router.post('/:id/teachers', this.addTeacher);
    }
}
exports.default = new SubjectRouter().router;
