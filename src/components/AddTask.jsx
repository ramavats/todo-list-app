import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      toast.error('Task name cannot be empty');
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

    setTaskName('');
    setTaskPriority('medium');
    setDueDate('');
    setReminder('');
    setCategory('');
    setTags('');
    setIsVisible(false);

  };

  return (
<div className='mt-2 lg:mx-5 mx-1 transition-all max-w-2xl duration-500 ease-in'>
      <button onClick={() => setIsVisible(!isVisible)} className={`bg-blue-500 text-white px-4 rounded-md py-2 ${ isVisible ? 'bg-red-500 mb-2' : '' }`}>
        {isVisible ? 'Cancel' : 'New Task'}
      </button>
      {isVisible && (
        <form className=' border-2 border-gray-400 w-full' onSubmit={handleSubmit}>
          <input
            className='w-full lg:max-w-2xl px-2 py-2'
            type="text"
            placeholder="Enter task name"
            value={taskName}
            onChange={handleTaskNameChange}
          />
          <div className='mt-2 flex w-full justify-between'>
          <select className='px-2 py-2' value={taskPriority} onChange={handleTaskPriorityChange}>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
          <input className='px-2 py-2 '
            type="date"
            placeholder="Due Date"
            value={dueDate}
            onChange={handleDueDateChange}
          />
          <input className='px-2 py-2'
            type="text"
            placeholder="Set Reminder"
            value={reminder}
            onChange={handleReminderChange}
          />
          </div>
          <input className='px-2 py-2'
            type="text"
            placeholder="Category"
            value={category} // New
            onChange={handleCategoryChange} // New
          />
          <input className='px-2 py-2'
            type="text"
            placeholder="Tags (comma-separated)"
            value={tags} // New
            onChange={handleTagsChange} // New
          />
          <div className='flex m-2'>
          <button className=' bg-green-700 text-white px-4 rounded-lg py-2' type="submit">Add Task</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default AddTask;
