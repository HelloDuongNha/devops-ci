const request = require('supertest');
const app = require('../app');

describe('Student Manager API', () => {
   let server;

   afterEach(() => {
      if (server) {
         server.close();
      }
   });

   // Test GET /api/students - Get all students
   test('GET /api/students should return all students', async () => {
      const res = await request(app).get('/api/students');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
   });

   // Test GET /api/students/:id - Get single student
   test('GET /api/students/:id should return a single student', async () => {
      const res = await request(app).get('/api/students/1');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('id', 1);
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('email');
   });

   // Test GET /api/students/:id with invalid ID
   test('GET /api/students/:id should return 404 for non-existent student', async () => {
      const res = await request(app).get('/api/students/999');
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('error');
   });

   // Test POST /api/students - Create new student
   test('POST /api/students should create a new student', async () => {
      const newStudent = {
         name: 'David Lee',
         email: 'david@example.com'
      };
      const res = await request(app)
         .post('/api/students')
         .send(newStudent);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toBe('David Lee');
      expect(res.body.email).toBe('david@example.com');
   });

   // Test POST /api/students with missing fields
   test('POST /api/students should return 400 if name or email is missing', async () => {
      const res = await request(app)
         .post('/api/students')
         .send({ name: 'John Doe' });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
   });

   // Test PUT /api/students/:id - Update student
   test('PUT /api/students/:id should update a student', async () => {
      const updates = {
         name: 'Alice Updated',
         email: 'alice.updated@example.com'
      };
      const res = await request(app)
         .put('/api/students/1')
         .send(updates);

      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe('Alice Updated');
      expect(res.body.email).toBe('alice.updated@example.com');
   });

   // Test PUT /api/students/:id with invalid ID
   test('PUT /api/students/:id should return 404 for non-existent student', async () => {
      const res = await request(app)
         .put('/api/students/999')
         .send({ name: 'Test' });

      expect(res.statusCode).toBe(404);
   });

   // Test DELETE /api/students/:id - Delete student
   test('DELETE /api/students/:id should delete a student', async () => {
      // First create a student to delete
      const newStudent = {
         name: 'To Delete',
         email: 'delete@example.com'
      };
      const createRes = await request(app)
         .post('/api/students')
         .send(newStudent);

      const studentId = createRes.body.id;

      // Delete the student
      const deleteRes = await request(app)
         .delete(`/api/students/${studentId}`);

      expect(deleteRes.statusCode).toBe(200);
      expect(deleteRes.body.id).toBe(studentId);
   });

   // Test DELETE /api/students/:id with invalid ID
   test('DELETE /api/students/:id should return 404 for non-existent student', async () => {
      const res = await request(app).delete('/api/students/999');
      expect(res.statusCode).toBe(404);
   });

   // Test GET / - Home page
   test('GET / should return HTML page', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toBe(200);
      expect(res.text).toContain('Student List');
   });
});