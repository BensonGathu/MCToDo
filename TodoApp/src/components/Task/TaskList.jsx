import React, { useEffect, useState } from "react";
import TaskService from "../services/TaskService";
import { Link } from "react-router-dom";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    async function fetchTasks() {
      try {
        const tasks = await TaskService.getAllTasks();
        setTasks(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchTasks();
  }, []);

  const handleMarkCompleted = async (taskId, title, description, status) => {
    console.log(taskId);
    try {
      await TaskService.updateTask(taskId, title, description, status);

      // Update the task's status in the state
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: "completed" } : task
        )
      );
    } catch (error) {
      console.error("Error marking task as completed:", error);
    }
  };

  const handleAddNewTask = () => {
    setShowAddTaskForm(true);
  };

  const handleCancelAddTask = () => {
    setShowAddTaskForm(false);
    setNewTask({
      title: "",
      description: "",
    });
  };

  const handleCreateTask = async () => {
    try {
      const createdTask = await TaskService.createTask(newTask);
      setTasks((prevTasks) => [createdTask, ...prevTasks]);

      setShowAddTaskForm(false);
      setNewTask({
        title: "",
        description: "",
      });
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="flex items-center  justify-center mb-4">
        <h2 className="text-2xl mr-5 font-bold">Task List</h2>

        <button
          onClick={handleAddNewTask}
          className="bg-blue-500 text-white p-2 rounded-lg"
        >
          Add New Task
        </button>
      </div>

      {showAddTaskForm ? (
        <form onSubmit={handleCreateTask}>
          <div className="p-4 bg-white shadow-md  rounded-lg">
            <h3 className="text-lg font-semibold">Create a New Task</h3>
            <div className="flex flex-col">
              <input
                minLength={5}
                required
                type="text"
                placeholder="Task Title"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 m-3"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
              />
              <textarea
                required
                placeholder="Task Description"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 m-3"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleCancelAddTask}
                className="text-red-500 mr-4"
              >
                Cancel
              </button>
              <button className="bg-green-500 text-white p-2 rounded-lg">
                Create Task
              </button>
            </div>
          </div>
        </form>
      ) : null}
      <br></br>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="bg-white shadow-md rounded-lg p-4 transition transform hover:scale-105 duration-300"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex-1">
                <Link to={`/tasks/${task._id}`}>
                  <h3 className="text-lg font-semibold">{task.title}</h3>
                  <p className="text-gray-600">{task.description}</p>
                  <p
                    className={`text-${
                      task.status === "completed" ? "green" : "red"
                    }-500 font-semibold mt-2`}
                  >
                    Status: {task.status}
                  </p>
                </Link>
              </div>
              <button
                onClick={() =>
                  handleMarkCompleted(
                    task._id,
                    task.title,
                    task.description,
                    "completed"
                  )
                }
                className={`bg-${
                  task.status === "completed" ? "gray" : "green"
                }-500 text-white p-2 rounded-lg mt-2`}
                disabled={task.status === "completed"}
              >
                {task.status === "completed" ? "Completed" : "Mark Completed"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
