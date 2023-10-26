import TaskService from './TaskService';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

describe('TaskService', () => {
  // Mock response data for testing
  const testData = { id: 1, title: 'Test Task', description: 'This is a test task', status: 'pending' };

  afterEach(() => {
    mock.reset();
  });

  it('should fetch all tasks', async () => {
    mock.onGet('/api/tasks').reply(200, [testData]);
    const tasks = await TaskService.getAllTasks();
    expect(tasks).toEqual([testData]);
  });

  it('should handle fetch all tasks error', async () => {
    mock.onGet('/api/tasks').reply(500, { error: 'Internal Server Error' });
    try {
      await TaskService.getAllTasks();
    } catch (error) {
      expect(error).toEqual({ error: 'Internal Server Error' });
    }
  });

  it('should create a new task', async () => {
    mock.onPost('/api/tasks', testData).reply(201, testData);
    const createdTask = await TaskService.createTask(testData);
    expect(createdTask).toEqual(testData);
  });

  it('should handle create task error', async () => {
    mock.onPost('/api/tasks', testData).reply(400, { error: 'Bad Request' });
    try {
      await TaskService.createTask(testData);
    } catch (error) {
      expect(error).toEqual({ error: 'Bad Request' });
    }
  });

  it('should get a task by ID', async () => {
    const taskId = 1;
    mock.onGet(`/api/tasks/${taskId}`).reply(200, testData);
    const task = await TaskService.getTaskById(taskId);
    expect(task).toEqual(testData);
  });

  it('should handle get task by ID error', async () => {
    const taskId = 1;
    mock.onGet(`/api/tasks/${taskId}`).reply(404, { error: 'Not Found' });
    try {
      await TaskService.getTaskById(taskId);
    } catch (error) {
      expect(error).toEqual({ error: 'Not Found' });
    }
  });

  it('should update an existing task', async () => {
    const taskId = 1;
    mock.onPut(`/api/tasks/${taskId}`, testData).reply(200, testData);
    const updatedTask = await TaskService.updateTask(taskId, testData.title, testData.description, testData.status);
    expect(updatedTask).toEqual(testData);
  });

  it('should handle update task error', async () => {
    const taskId = 1;
    mock.onPut(`/api/tasks/${taskId}`, testData).reply(400, { error: 'Bad Request' });
    try {
      await TaskService.updateTask(taskId, testData.title, testData.description, testData.status);
    } catch (error) {
      expect(error).toEqual({ error: 'Bad Request' });
    }
  });

  it('should delete a task', async () => {
    const taskId = 1;
    mock.onDelete(`/api/tasks/${taskId}`).reply(204);
    const response = await TaskService.deleteTask(taskId);
    expect(response).toEqual(undefined);
  });

  it('should handle delete task error', async () => {
    const taskId = 1;
    mock.onDelete(`/api/tasks/${taskId}`).reply(500, { error: 'Internal Server Error' });
    try {
      await TaskService.deleteTask(taskId);
    } catch (error) {
      expect(error).toEqual({ error: 'Internal Server Error' });
    }
  });
});
