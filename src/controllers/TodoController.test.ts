import mongoose from 'mongoose';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app';
import Todo from '../models/Todo';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect(); // tránh double connection
  }

  await mongoose.connect(uri);
}, 20000); // ⏱ đủ thời gian khởi tạo MongoDB trong CI

beforeEach(async () => {
  await Todo.deleteMany({});
}, 10000); // tránh timeout khi xóa dữ liệu chậm

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) await mongoServer.stop();
});

describe('POST /api/todos/create', () => {
  it('should create a new todo', async () => {
    const newTodo = {
      title: 'New Task',
      description: 'This is a test task',
      completed: false,
    };

    const response = await request(app)
      .post('/api/todos/create')
      .send(newTodo);

    expect(response.statusCode).toBe(302); // Redirect
    const todosInDb = await Todo.find();
    expect(todosInDb.length).toBe(1);
    expect(todosInDb[0].title).toBe('New Task');
  });

  it('should return 400 if required fields are missing', async () => {
    const response = await request(app)
      .post('/api/todos/create')
      .send({ title: '', description: '', completed: false });

    expect(response.statusCode).toBe(400);
  });
});
