import React from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";

function TaskList({ tasks, addTask, updateTask, deleteTask }) {
  return (
    <div className="task-list">
      <TaskForm addTask={addTask} />
      <h2>Tasks</h2>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
}

export default TaskList;
