import React, { useState } from 'react';

function AddTask({ addTask }) {
  const [isVisible, setIsVisible] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskPriority, setTaskPriority] = useState('medium'); // Default priority is 'medium'
  const [dueDate, setDueDate] = useState('');
  const [reminder, setReminder] = useState('');
  const [category, setCategory] = useState(''); // New
  const [tags, setTags] = useState(''); // New

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

  const handleCategoryChange = (e) => {
    setCategory(e.target.value); // New
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value); // New
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (taskName.trim() === '') {
      return;
    }

    const tagsArray = tags.split(',').map((tag) => tag.trim()); // Split tags into an array

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
      category: category || null, // Assign category
      tags: tagsArray || null, // Assign tags
    };

    addTask(newTask);

    // Clear the input fields
    setTaskName('');
    setTaskPriority('medium');
    setDueDate('');
    setReminder('');
    setCategory(''); // Reset category
    setTags(''); // Reset tags
    setIsVisible(false); // Hide the input fields after submitting
  };

  return (
<div>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Cancel' : 'Add a new task'}
      </button>
      {isVisible && (
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
          <input
            type="text"
            placeholder="Category"
            value={category} // New
            onChange={handleCategoryChange} // New
          />
          <input
            type="text"
            placeholder="Tags (comma-separated)"
            value={tags} // New
            onChange={handleTagsChange} // New
          />
          <button className=' bg-green-700 text-white px-2 rounded-lg py-1' type="submit">Add Task</button>
        </form>
      )}
    </div>
  );
}

export default AddTask;
