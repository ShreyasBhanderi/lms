import { Request, Response, Router } from 'express';
import Subject from '../models/subject';
import Teacher from '../models/teacher';
class SubjectRouter {

    public router: Router;
  
    constructor() {
      this.router = Router();
      this.routes();
    }
  
    public all(req: Request, res: Response): void {
      Subject.findAll()
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
    
    }

    public allTeachers(req: Request, res: Response): void {
      const id: number = req.params.id;
  
      Subject.findOne({ where:{
        id:id
       }
      })
      .then((data) => {
         {data.getTeachers({attributes: ['name']}).then((data)=>{res.status(200).json(data)})}
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
    
    }

   


    public addTeacher(req: Request, res: Response): void {
      const id: number = req.params.id;
  
      Subject.findOne({ where:{
        id:id
       }
      })
      .then((data) => {
         Teacher.findOne({
           where : {
             name:req.body.name
           }
         }).then(function(obj) {
          if(obj) { // update
              return obj.update({name:req.body.name});
          }
          else { // insert
              return Teacher.create({name:req.body.name});
          }
      }).then((obj)=>{data.addTeachers(obj); res.status(500).json({ obj });})
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
    
    }
  
    public one(req: Request, res: Response): void {
      const id: number = req.params.id;
  
      Subject.findOne({ where:{
        id:id
       }
       })
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
    }
  
    public create(req: Request, res: Response): void {
      const name: string = req.body.name;
  
      const course = new Subject({
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
  
    public update(req: Request, res: Response): void {
      const id: string = req.params.id;
  
      Subject.update({name:req.body.name},{ where:{
        id:id
       }
       })
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  
    }
  
    public delete(req: Request, res: Response): void {
      const id: string = req.params.id;
  
      Subject.destroy({ where:{
        id:id
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
    public routes() {
      this.router.get('/', this.all);
      this.router.get('/:id', this.one);
      this.router.post('/', this.create);
      this.router.put('/:id', this.update);
      this.router.delete('/:id', this.delete);
      this.router.get('/:id/teachers',this.allTeachers);
      this.router.post('/:id/teachers',this.addTeacher);
    }
  
  }
  
  
  export default new SubjectRouter().router;