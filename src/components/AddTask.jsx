import React, { useState } from 'react';

function AddTask({ addTask }) {
  const [taskName, setTaskName] = useState('');
  const [taskPriority, setTaskPriority] = useState('medium'); // Default priority is 'medium'
  const [dueDate, setDueDate] = useState('');
  const [reminder, setReminder] = useState('');

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleTaskPriorityChange = (e) => {
    setTaskPriority(e.target.value);
  };

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };

  const handleReminderChange = (e) => {
    setReminder(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (taskName.trim() === '') {
      return;
    }

    // Convert the priority value to a numerical value
    let priorityValue;
    switch (taskPriority) {
      case 'high':
        priorityValue = 1;
        break;
      case 'low':
        priorityValue = 3;
        break;
      default:
        priorityValue = 2; // Medium
    }

    const newTask = {
      id: Math.random(), // You can use a better ID generation method
      name: taskName,
      priority: priorityValue,
      dueDate: dueDate || null,
      reminder: reminder || null,
    };

    addTask(newTask);

    // Clear the input fields
    setTaskName('');
    setTaskPriority('medium');
    setDueDate('');
    setReminder('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task name"
        value={taskName}
        onChange={handleTaskNameChange}
      />
      <select value={taskPriority} onChange={handleTaskPriorityChange}>
        <option value="high">High Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="low">Low Priority</option>
      </select>
      <input
        type="date"
        placeholder="Due Date"
        value={dueDate}
        onChange={handleDueDateChange}
      />
      <input
        type="text"
        placeholder="Set Reminder"
        value={reminder}
        onChange={handleReminderChange}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default AddTask;
