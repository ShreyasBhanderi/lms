import { Router } from 'express';
import courses from './courses';
import subjects from './subjects';
import students from './students';
import teachers from './teachers';

class Route {
    public route: Router;
    constructor(){
        this.route = Router();
        this.routes();
    }
    public routes() {
            this.route.use('/courses', courses)
            this.route.use('/subjects', subjects)
            this.route.use('/teachers', teachers)
            this.route.use('/students', students)
        }
}


export default new Route().route;   