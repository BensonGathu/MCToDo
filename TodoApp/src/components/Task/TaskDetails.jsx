import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import TaskService from "../services/TaskService";

function TaskDetails() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [task, setTask] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedTask, setEditedTask] = useState(null);

  useEffect(() => {
    async function fetchTaskDetails() {
      try {
        const taskData = await TaskService.getTaskById(taskId);
        setTask(taskData);
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    }

    fetchTaskDetails();
  }, [taskId]);

  const handleEditTask = () => {
    setEditMode(true);
    setEditedTask({ ...task });
  };

  const handleSaveTask = async () => {
    try {
      await TaskService.updateTask(
        taskId,
        editedTask.title,
        editedTask.description,
        editedTask.status
      );

      setTask({ ...editedTask });

      setEditMode(false);
    } catch (error) {
      console.error("Error saving edited task:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedTask(null);
  };

  const handleDeleteTask = async () => {
    try {
      await TaskService.deleteTask(taskId);
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      {task ? (
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {task.title}
          </h2>
          <p className="text-gray-600 mb-2">Status: {task.status}</p>
          <p className="text-gray-600 mb-4">
            Created on: {new Date(task.creationDate).toLocaleDateString()}
          </p>
          {editMode ? (
            <form onSubmit={handleSaveTask}>
              <div className="mb-4">
                <input
                  minLength={5}
                  type="text"
                  value={editedTask.title}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, title: e.target.value })
                  }
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 m-3"
                />
                <textarea
                  value={editedTask.description}
                  onChange={(e) =>
                    setEditedTask({
                      ...editedTask,
                      description: e.target.value,
                    })
                  }
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 m-3"
                  rows="4"
                />
                <div className="mt-4 space-x-4">
                  <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div>
              <p className="text-gray-800 mb-4">{task.description}</p>
              <div className="mt-4 space-x-4">
                <button
                  onClick={handleEditTask}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Edit Task
                </button>
                <button
                  onClick={handleDeleteTask}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  Delete Task
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-800">Loading task details...</p>
      )}
    </div>
  );
}

export default TaskDetails;
