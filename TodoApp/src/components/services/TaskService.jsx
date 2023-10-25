import api from "../utils/api";

const TaskService = {
  //Fetching all tasks
  async getAllTasks() {
    try {
      const response = await api.get("/api/tasks");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  //Creating a new task
  async createTask(taskData) {
    try {
      const response = await api.post("/api/tasks", taskData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  //Updating an existing task
  async updateTask(taskId, taskData) {
    try {
      const response = await api.put(`/api/tasks/${taskId}`, taskData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  //Deleting a task
  async deleteTask(taskId) {
    try {
      const response = await api.delete(`/api/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default TaskService;
