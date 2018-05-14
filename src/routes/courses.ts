import { Request, Response, Router } from "express";
import Course from "../models/course";
import lecture from "../models/lecture";
import batch from "../models/batch";
import Batch from "../models/batch";
import Lecture from "../models/lecture";
import Student from "../models/Student";
import Teacher from "../models/teacher";

class CourseRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
    batch.findAll().then();
  }

  public all(req: Request, res: Response): void {
    Course.findAll()
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  public one(req: Request, res: Response): void {
    const id: number = req.params.id;

    Course.findOne({
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

  public create(req: Request, res: Response): void {
    const name: string = req.body.name;

    const course = new Course({
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
  public allBatch(req: Request, res: Response): void {
    const id: number = req.params.id;

    Course.findOne({
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

  public addBatch(req: Request, res: Response): void {
    const id: number = req.params.id;

    Course.findOne({
      where: {
        id: id
      }
    })
      .then(data => {
        Batch.findOne({
          where: {
            name: req.body.name
          }
        })
          .then(function(obj) {
            if (obj) {
              // update
              return obj.update({ name: req.body.name });
            } else {
              // insert
              return Batch.create({ name: req.body.name });
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

  public update(req: Request, res: Response): void {
    const id: string = req.params.id;

    Course.update(
      { name: req.body.name },
      {
        where: {
          id: id
        }
      }
    )
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  public oneBatch(req: Request, res: Response): void {
    const id: number = req.params.id1;

    Course.findOne({
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
  public deleteBatch(req: Request, res: Response): void {
    const id: number = req.params.id1;

    Course.findOne({
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

  public lectures(req: Request, res: Response): void {
    const id: number = req.params.id1;

    Course.findOne({
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

  public oneLecture(req: Request, res: Response): void {
    const id: number = req.params.id1;

    Course.findOne({
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
                .then(data =>
                  res.status(200).json(data.filter(x => x.id == req.params.id3))
                )
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

  public deleteLecture(req: Request, res: Response): void {
    const id: number = req.params.id1;

    Course.findOne({
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

  public deleteTeacher(req: Request, res: Response): void {
    const id: number = req.params.id1;

    Course.findOne({
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

  public deleteStudent(req: Request, res: Response): void {
    const id: number = req.params.id1;

    Course.findOne({
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

  public addLecture(req: Request, res: Response): void {
    const id: number = req.params.id1;

    Course.findOne({
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
              Lecture.findOne({
                where: {
                  name: req.body.name
                }
              })
                .then(function(obj) {
                  if (obj) {
                    // update
                    return obj.update({ name: req.body.name });
                  } else {
                    // insert
                    return Lecture.create({ name: req.body.name });
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

  public addStudent(req: Request, res: Response): void {
    const id: number = req.params.id1;

    Course.findOne({
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
              Student.findOne({
                where: {
                  name: req.body.name
                }
              })
                .then(function(obj) {
                  if (obj) {
                    // update
                    return obj.update({ name: req.body.name });
                  } else {
                    // insert
                    return Student.create({ name: req.body.name });
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
  public addTeachers(req: Request, res: Response): void {
    const id: number = req.params.id1;

    Course.findOne({
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
              Teacher.findOne({
                where: {
                  name: req.body.name
                }
              })
                .then(function(obj) {
                  if (obj) {
                    // update
                    return obj.update({ name: req.body.name });
                  } else {
                    // insert
                    return Teacher.create({ name: req.body.name });
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

  public students(req: Request, res: Response): void {
    const id: number = req.params.id1;

    Course.findOne({
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

  public teachers(req: Request, res: Response): void {
    const id: number = req.params.id1;

    Course.findOne({
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

  public delete(req: Request, res: Response): void {
    const id: string = req.params.id;

    Course.destroy({
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
  public routes() {
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

export default new CourseRouter().router;
