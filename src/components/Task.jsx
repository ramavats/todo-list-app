import React from 'react';

function Task({ task, deleteTask }) {
  const handleDelete = () => {
    deleteTask(task.id);
  };

  return (
    <li>
      <span>{task.name}</span>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default Task;
