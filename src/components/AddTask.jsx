import React, { useState } from 'react';

function AddTask({ addTask }) {
  const [taskName, setTaskName] = useState('');

  const handleInputChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim() !== '') {
      const newTask = {
        id: Date.now(),
        name: taskName,
      };
      addTask(newTask);
      setTaskName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={taskName}
        onChange={handleInputChange}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTask;
