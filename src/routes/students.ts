import { Request, Response, Router } from 'express';
import Student from '../models/Student';
import Batch from '../models/batch';
class StudentRouter {

    public router: Router;
  
    constructor() {
      this.router = Router();
      this.routes();
    }
  
    public all(req: Request, res: Response): void {
      Student.findAll()
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
    
    }
  
    public allBatch(req: Request, res: Response): void {
      const id: number = req.params.id;
  
      Student.findOne({ where:{
        id:id
       }
      })
      .then((data) => {
         {data.getBatch({attributes: ['name']}).then((data)=>{res.status(200).json(data)})}
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
    
    }

   


    public addBatch(req: Request, res: Response): void {
      const id: number = req.params.id;
  
      Student.findOne({ where:{
        id:id
       }
      })
      .then((data) => {
         Batch.findOne({
           where : {
             name:req.body.name
           }
         }).then(function(obj) {
          if(obj) { // update
              return obj.update({name:req.body.name});
          }
          else { // insert
              return Batch.create({name:req.body.name});
          }
      }).then((obj)=>{data.addBatch(obj); res.status(500).json({ obj });})
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
    
    }
    public one(req: Request, res: Response): void {
      const id: number = req.params.id;
      Student.findOne({ where:{
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
  
      const course = new Student({
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
  
      Student.update({name:req.body.name},{ where:{
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
  
      Student.destroy({ where:{
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
      this.router.get('/:id/batches',this.allBatch);
      this.router.post('/:id/batches',this.addBatch);
    }
  
  }
  
  
  export default new StudentRouter().router;