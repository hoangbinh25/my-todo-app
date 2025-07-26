import express from 'express';
import { connectDb } from './config/db'; 
import todoRoutes from './routes/toDoRoutes';

const app = express();

app.use(express.json());

connectDb();

app.use('/api/todos', todoRoutes)

export default app;