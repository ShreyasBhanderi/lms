"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_1 = __importDefault(require("../models/course"));
const batch_1 = __importDefault(require("../models/batch"));
const batch_2 = __importDefault(require("../models/batch"));
const lecture_1 = __importDefault(require("../models/lecture"));
const Student_1 = __importDefault(require("../models/Student"));
const teacher_1 = __importDefault(require("../models/teacher"));
class CourseRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
        batch_1.default.findAll().then();
    }
    all(req, res) {
        course_1.default.findAll()
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    one(req, res) {
        const id = req.params.id;
        course_1.default.findOne({
            where: {
                id: id
            }
        })
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    create(req, res) {
        const name = req.body.name;
        const course = new course_1.default({
            name
        });
        course
            .save()
            .then(data => {
            res.status(201).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    allBatch(req, res) {
        const id = req.params.id;
        course_1.default.findOne({
            where: {
                id: id
            }
        })
            .then(data => {
            {
                data
                    .getBatch({ attributes: ["name"] })
                    .then(data => {
                    res.status(200).json(data);
                })
                    .catch(error => {
                    res.status(500).json({ error });
                });
            }
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    addBatch(req, res) {
        const id = req.params.id;
        course_1.default.findOne({
            where: {
                id: id
            }
        })
            .then(data => {
            batch_2.default.findOne({
                where: {
                    name: req.body.name
                }
            })
                .then(function (obj) {
                if (obj) {
                    // update
                    return obj.update({ name: req.body.name });
                }
                else {
                    // insert
                    return batch_2.default.create({ name: req.body.name });
                }
            })
                .then(obj => {
                data.addBatch(obj);
                res.status(500).json({ obj });
            })
                .catch(error => {
                res.status(500).json({ error });
            });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    update(req, res) {
        const id = req.params.id;
        course_1.default.update({ name: req.body.name }, {
            where: {
                id: id
            }
        })
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    oneBatch(req, res) {
        const id = req.params.id1;
        course_1.default.findOne({
            where: {
                id: id
            }
        })
            .then(data => {
            {
                data
                    .getBatch({ attributes: ["name", "id"] })
                    .then(data => {
                    res.status(200).json(data.filter(x => x.id == req.params.id2));
                })
                    .catch(error => {
                    res.status(500).json({ error });
                });
            }
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    deleteBatch(req, res) {
        const id = req.params.id1;
        course_1.default.findOne({
            where: {
                id: id
            }
        })
            .then(data => {
            {
                data.getBatch({ attributes: ["name", "id"] }).then(data => {
                    data.setBatch(data.filter(x => x.name != req.body.name));
                    res.status(200).json(data.filter(x => x.name != req.body.name));
                });
            }
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    lectures(req, res) {
        const id = req.params.id1;
        course_1.default.findOne({
            where: {
                id: id
            }
        })
            .then(data => {
            {
                data
                    .getBatch({ attributes: ["name", "id"] })
                    .then(data => {
                    data
                        .filter(x => x.id == req.params.id2)[0]
                        .getLecture()
                        .then(data => res.status(200).json(data))
                        .catch(error => {
                        res.status(500).json({ error });
                    });
                })
                    .catch(error => {
                    res.status(500).json({ error });
                });
            }
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    oneLecture(req, res) {
        const id = req.params.id1;
        course_1.default.findOne({
            where: {
                id: id
            }
        })
            .then(data => {
            {
                data
                    .getBatch({ attributes: ["name", "id"] })
                    .then(data => {
                    data
                        .filter(x => x.id == req.params.id2)[0]
                        .getLecture()
                        .then(data => res.status(200).json(data.filter(x => x.id == req.params.id3)))
                        .catch(error => {
                        res.status(500).json({ error });
                    });
                })
                    .catch(error => {
                    res.status(500).json({ error });
                });
            }
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    deleteLecture(req, res) {
        const id = req.params.id1;
        course_1.default.findOne({
            where: {
                id: id
            }
        })
            .then(data => {
            {
                data
                    .getBatch({ attributes: ["name", "id"] })
                    .then(data => {
                    data = data.filter(x => x.id == req.params.id2)[0];
                    data
                        .getLecture({ attributes: ["name", "id"] })
                        .then(obj => {
                        data.setLectures(obj.filter(x => x.name != req.body.name));
                        res
                            .status(200)
                            .json(obj.filter(x => x.name != req.body.name));
                    })
                        .catch(error => {
                        res.status(500).json({ error });
                    });
                })
                    .catch(error => {
                    res.status(500).json({ error });
                });
            }
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    deleteTeacher(req, res) {
        const id = req.params.id1;
        course_1.default.findOne({
            where: {
                id: id
            }
        })
            .then(data => {
            {
                data
                    .getBatch({ attributes: ["name", "id"] })
                    .then(data => {
                    data = data.filter(x => x.id == req.params.id2)[0];
                    data
                        .getTeacher({ attributes: ["name", "id"] })
                        .then(obj => {
                        data.setTeachers(obj.filter(x => x.name != req.body.name));
                        res
                            .status(200)
                            .json(obj.filter(x => x.name != req.body.name));
                    })
                        .catch(error => {
                        res.status(500).json({ error });
                    });
                })
                    .catch(error => {
                    res.status(500).json({ error });
                });
            }
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    deleteStudent(req, res) {
        const id = req.params.id1;
        course_1.default.findOne({
            where: {
                id: id
            }
        })
            .then(data => {
            {
                data
                    .getBatch({ attributes: ["name", "id"] })
                    .then(data => {
                    data = data.filter(x => x.id == req.params.id2)[0];
                    data
                        .getStudent({ attributes: ["name", "id"] })
                        .then(obj => {
                        data.setStudent(obj.filter(x => x.name != req.body.name));
                        res
                            .status(200)
                            .json(obj.filter(x => x.name != req.body.name));
                    })
                        .catch(error => {
                        res.status(500).json({ error });
                    });
                })
                    .catch(error => {
                    res.status(500).json({ error });
                });
            }
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    addLecture(req, res) {
        const id = req.params.id1;
        course_1.default.findOne({
            where: {
                id: id
            }
        })
            .then(data => {
            {
                data
                    .getBatch({ attributes: ["name", "id"] })
                    .then(data => {
                    data = data.filter(x => x.id == req.params.id2)[0];
                    lecture_1.default.findOne({
                        where: {
                            name: req.body.name
                        }
                    })
                        .then(function (obj) {
                        if (obj) {
                            // update
                            return obj.update({ name: req.body.name });
                        }
                        else {
                            // insert
                            return lecture_1.default.create({ name: req.body.name });
                        }
                    })
                        .then(obj => {
                        data.addLecture(obj);
                        res.status(500).json({ obj });
                    })
                        .catch(error => {
                        res.status(500).json({ error });
                    });
                })
                    .catch(error => {
                    res.status(500).json({ error });
                });
            }
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    addStudent(req, res) {
        const id = req.params.id1;
        course_1.default.findOne({
            where: {
                id: id
            }
        })
            .then(data => {
            {
                data
                    .getBatch({ attributes: ["name", "id"] })
                    .then(data => {
                    data = data.filter(x => x.id == req.params.id2)[0];
                    Student_1.default.findOne({
                        where: {
                            name: req.body.name
                        }
                    })
                        .then(function (obj) {
                        if (obj) {
                            // update
                            return obj.update({ name: req.body.name });
                        }
                        else {
                            // insert
                            return Student_1.default.create({ name: req.body.name });
                        }
                    })
                        .then(obj => {
                        data.addStudent(obj);
                        res.status(500).json({ obj });
                    })
                        .catch(error => {
                        res.status(500).json({ error });
                    });
                })
                    .catch(error => {
                    res.status(500).json({ error });
                });
            }
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    addTeachers(req, res) {
        const id = req.params.id1;
        course_1.default.findOne({
            where: {
                id: id
            }
        })
            .then(data => {
            {
                data
                    .getBatch({ attributes: ["name", "id"] })
                    .then(data => {
                    data = data.filter(x => x.id == req.params.id2)[0];
                    teacher_1.default.findOne({
                        where: {
                            name: req.body.name
                        }
                    })
                        .then(function (obj) {
                        if (obj) {
                            // update
                            return obj.update({ name: req.body.name });
                        }
                        else {
                            // insert
                            return teacher_1.default.create({ name: req.body.name });
                        }
                    })
                        .catch(error => {
                        res.status(500).json({ error });
                    })
                        .then(obj => {
                        data.addTeacher(obj);
                        res.status(500).json({ obj });
                    })
                        .catch(error => {
                        res.status(500).json({ error });
                    });
                })
                    .catch(error => {
                    res.status(500).json({ error });
                });
            }
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    students(req, res) {
        const id = req.params.id1;
        course_1.default.findOne({
            where: {
                id: id
            }
        })
            .then(data => {
            {
                data
                    .getBatch({ attributes: ["name", "id"] })
                    .then(data => {
                    data
                        .filter(x => x.id == req.params.id2)[0]
                        .getStudent()
                        .then(data => res.status(200).json(data))
                        .catch(error => {
                        res.status(500).json({ error });
                    });
                })
                    .catch(error => {
                    res.status(500).json({ error });
                });
            }
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    teachers(req, res) {
        const id = req.params.id1;
        course_1.default.findOne({
            where: {
                id: id
            }
        })
            .then(data => {
            {
                data
                    .getBatch({ attributes: ["name", "id"] })
                    .then(data => {
                    data
                        .filter(x => x.id == req.params.id2)[0]
                        .getTeacher()
                        .then(data => res.status(200).json(data))
                        .catch(error => {
                        res.status(500).json({ error });
                    });
                })
                    .catch(error => {
                    res.status(500).json({ error });
                });
            }
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    delete(req, res) {
        const id = req.params.id;
        course_1.default.destroy({
            where: {
                id: id
            }
        })
            .then(() => {
            res.status(204).end();
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    // set up our routes
    routes() {
        this.router.get("/", this.all);
        this.router.get("/:id", this.one);
        this.router.post("/", this.create);
        this.router.put("/:id", this.update);
        this.router.delete("/:id", this.delete);
        this.router.get("/:id/batches", this.allBatch);
        this.router.post("/:id/batches", this.addBatch);
        this.router.delete("/:id/batches", this.deleteBatch);
        this.router.get("/:id1/batches/:id2", this.oneBatch);
        this.router.get("/:id1/batches/:id2/lectures", this.lectures);
        this.router.post("/:id1/batches/:id2/lectures", this.addLecture);
        this.router.delete("/:id1/batches/:id2/lectures", this.deleteLecture);
        this.router.get("/:id1/batches/:id2lectures/id3", this.oneLecture);
        this.router.get("/:id1/batches/:id2/students", this.students);
        this.router.post("/:id1/batches/:id2/students", this.addStudent);
        this.router.delete("/:id1/batches/:id2/students", this.deleteStudent);
        this.router.get("/:id1/batches/:id2/teachers", this.teachers);
        this.router.post("/:id1/batches/:id2/teachers", this.addTeachers);
        this.router.delete("/:id1/batches/:id2/teachers", this.deleteTeacher);
    }
}
exports.default = new CourseRouter().router;
