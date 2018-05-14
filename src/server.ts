import exp from 'express';
import path from 'path';
import route from './routes/routes';

const app = exp();

app.use(exp.json())
app.use(exp.urlencoded({extended: true}))

app.use('/api',route)

app.listen(7710)

