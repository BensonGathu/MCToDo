import TaskService from '../services/TaskService';

describe('TaskService', () => {
  test('getAllTasks should return an array of tasks', async () => {
    const tasks = await TaskService.getAllTasks();
    expect(Array.isArray(tasks)).toBe(true);
  });

  test('getTaskById should return a task with a specific ID', async () => {
    const taskId = 'your-task-id-here';
    const task = await TaskService.getTaskById(taskId);
    expect(task).toMatchObject({ _id: taskId });
  });

  test('createTask should create a new task', async () => {
    const newTaskData = {
      title: 'New Task',
      description: 'Task description',
    };
    const createdTask = await TaskService.createTask(newTaskData);
    expect(createdTask).toMatchObject(newTaskData);
  });

});
