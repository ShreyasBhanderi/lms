"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Student_1 = __importDefault(require("../models/Student"));
const batch_1 = __importDefault(require("../models/batch"));
class StudentRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    all(req, res) {
        Student_1.default.findAll()
            .then((data) => {
            res.status(200).json({ data });
        })
            .catch((error) => {
            res.status(500).json({ error });
        });
    }
    allBatch(req, res) {
        const id = req.params.id;
        Student_1.default.findOne({ where: {
                id: id
            }
        })
            .then((data) => {
            {
                data.getBatch({ attributes: ['name'] }).then((data) => { res.status(200).json(data); });
            }
        })
            .catch((error) => {
            res.status(500).json({ error });
        });
    }
    addBatch(req, res) {
        const id = req.params.id;
        Student_1.default.findOne({ where: {
                id: id
            }
        })
            .then((data) => {
            batch_1.default.findOne({
                where: {
                    name: req.body.name
                }
            }).then(function (obj) {
                if (obj) { // update
                    return obj.update({ name: req.body.name });
                }
                else { // insert
                    return batch_1.default.create({ name: req.body.name });
                }
            }).then((obj) => { data.addBatch(obj); res.status(500).json({ obj }); });
        })
            .catch((error) => {
            res.status(500).json({ error });
        });
    }
    one(req, res) {
        const id = req.params.id;
        Student_1.default.findOne({ where: {
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
        const course = new Student_1.default({
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
        Student_1.default.update({ name: req.body.name }, { where: {
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
        Student_1.default.destroy({ where: {
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
        this.router.get('/:id/batches', this.allBatch);
        this.router.post('/:id/batches', this.addBatch);
    }
}
exports.default = new StudentRouter().router;
