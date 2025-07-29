import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app';
import Todo from '../models/Todo';

let mongoServer: MongoMemoryServer;

// beforeAll(async () => {
//     mongoServer = await MongoMemoryServer.create();
//     const uri = mongoServer.getUri();
//     await mongoose.connect(uri);
// });

// afterEach(async() => {
//     await Todo.deleteMany({});
// });


// afterAll(async () => {
//   await mongoose.disconnect();
//   await mongoServer.stop();
// });

// describe('GET /api/todos', () => {
//   it('should return all todos', async () => {
//     await Todo.create({ title: 'Test 1', description: 'Desc 1', completed: false });

//     const res = await request(app).get('/api/todos');

//     expect(res.statusCode).toBe(200);
//     expect(res.text).toContain('Test 1'); 
//   });
// });



// afterEach(async () => {
//   await Todo.deleteMany({});
// });

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

  it('should return 500 if required fields are missing', async () => {
    const response = await request(app)
      .post('/api/todos/create')
      .send({ title: '', description: '', completed: false });

  expect(response.statusCode).toBe(400);
  }, 5000);
});
