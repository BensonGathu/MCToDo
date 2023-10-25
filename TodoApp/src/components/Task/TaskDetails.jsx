import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TaskService from "../services/TaskService";

function TaskDetails() {
  const { taskId } = useParams();
  //   const history = useHistory();
  const [task, setTask] = useState(null);

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
    // history.push(`/tasks/${taskId}/edit`);
  };

  const handleDeleteTask = async () => {
    try {
      await TaskService.deleteTask(taskId);
      //   history.push("/tasks");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      {task ? (
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-2xl font-bold">{task.title}</h2>
          <p className="text-gray-600">Status: {task.status}</p>

          <p className="mt-4">{task.description}</p>
          <div className="mt-4">
            <button
              onClick={handleEditTask}
              className="bg-blue-500 text-white p-2 rounded-lg mr-2"
            >
              Edit Task
            </button>
            <button
              onClick={handleDeleteTask}
              className="bg-red-500 text-white p-2 rounded-lg"
            >
              Delete Task
            </button>
          </div>
        </div>
      ) : (
        <p>Loading task details...</p>
      )}
    </div>
  );
}

export default TaskDetails;
