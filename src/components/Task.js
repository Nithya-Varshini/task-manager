import React, { useState } from "react";
import './Task.css';

function Task({ task, updateTask, deleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedTask = { ...task, title, description, dueDate };
    console.log("Saving task:", updatedTask);

    fetch(`https://task-manager-server-494n.onrender.com/api/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Task updated:", data);
        updateTask(data);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  const handleDelete = () => {
    fetch(`https://task-manager-server-494n.onrender.com/api/tasks/${task.id}`, {
      method: "DELETE",
    })
      .then(() => {
        deleteTask(task.id);
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  return (
    <div className="task">
      {isEditing ? (
        <div className="task-edit">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="task-input"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="task-textarea"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="task-date"
          />
          <button onClick={handleSave} className="task-button save-button">Save</button>
        </div>
      ) : (
        <div className="task-view">
          <h3 className="task-title">{task.title}</h3>
          <p className="task-description">{task.description}</p>
          <p className="task-due-date">Due Date: {task.dueDate}</p>
          <div className="task-buttons">
            <button onClick={handleEdit} className="task-button edit-button">Edit</button>
            <button onClick={handleDelete} className="task-button delete-button">Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Task;
