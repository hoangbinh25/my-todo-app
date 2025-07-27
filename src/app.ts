import express from 'express';
import methodOverride from 'method-override';
import { connectDb } from './config/db'; 
import todoRoutes from './routes/toDoRoutes';
import path from 'path';

const app = express();
app.set('view engine', 'ejs'); // Template engine
app.set('views', path.join(__dirname, 'views'))

app.use(express.json());

app.use(express.urlencoded({ extended: true}));

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

connectDb();

app.use('/api/todos', todoRoutes)

export default app;
