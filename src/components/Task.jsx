import React, { useState } from 'react';

function Task({ task, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskName, setEditedTaskName] = useState(task.name);
  const [editedTaskPriority, setEditedTaskPriority] = useState(task.priority);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate || '');
  const [editedReminder, setEditedReminder] = useState(task.reminder || '');
  const [editedCategory, setEditedCategory] = useState(task.category || ''); // New
  const [editedTags, setEditedTags] = useState(task.tags ? task.tags.join(', ') : ''); // New

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Perform validation if needed
    if (editedTaskName.trim() === '') {
      return;
    }

    const tagsArray = editedTags.split(',').map((tag) => tag.trim());

    editTask(
      task.id,
      editedTaskName,
      editedTaskPriority,
      editedDueDate,
      editedReminder,
      editedCategory,
      tagsArray // Pass the tags array
    );
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setEditedTaskName(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setEditedTaskPriority(parseInt(e.target.value, 10));
  };

  const handleDueDateChange = (e) => {
    setEditedDueDate(e.target.value);
  };

  const handleReminderChange = (e) => {
    setEditedReminder(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setEditedCategory(e.target.value);
  };

  const handleTagsChange = (e) => {
    setEditedTags(e.target.value);
  };


  const handleCancel = () => {
    // Reset the edited task fields and exit edit mode
    setEditedTaskName(task.name);
    setEditedTaskPriority(task.priority);
    setEditedDueDate(task.dueDate || '');
    setEditedReminder(task.reminder || '');
    setEditedCategory(task.category || ''); // Reset category
    setEditedTags(task.tags ? task.tags.join(', ') : ''); // Reset tags
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <div className='flex flex-col'>
          <input
            type="text"
            value={editedTaskName}
            onChange={handleInputChange}
          />
          <select
            value={editedTaskPriority}
            onChange={handlePriorityChange}
          >
            <option value={1}>High</option>
            <option value={2}>Medium</option>
            <option value={3}>Low</option>
          </select>
          <input
            type="date"
            value={editedDueDate}
            onChange={handleDueDateChange}
          />
          <input
            type="text"
            placeholder="Set Reminder"
            value={editedReminder}
            onChange={handleReminderChange}
          />
          <input
            type="text"
            placeholder="Category"
            value={editedCategory} // New
            onChange={handleCategoryChange} // New
          />
          <input
            type="text"
            placeholder="Tags (comma-separated)"
            value={editedTags} // New
            onChange={handleTagsChange} // New
          />
          <button onClick={handleSave}>Save</button>
          <button className='bg-red-600 text-white font-bold px-2 rounded-lg py-1' onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div className='flex flex-col'>
          <span>{task.name}</span>
          <span>{task.priority === 1 ? 'High' : task.priority === 2 ? 'Medium' : 'Low'}</span>
          {task.dueDate && <span>Due: {task.dueDate}</span>}
          {task.reminder && <span>Reminder: {task.reminder}</span>}
          {task.category && <span>Category: {task.category}</span>} {/* Display category */}
          {task.tags && <span>Tags: {task.tags.join(', ')}</span>} {/* Display tags */}
          <div className='flex justify-even'>
            <button className='btn bg-blue-800 text-white px-4 rounded-lg py-1 mx-2' onClick={handleEdit}>Edit</button>
            <button className='btn bg-red-600 text-white px-4 rounded-lg py-1 mx-2' onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
          <hr className='mt-2 justify-center items-center max-w-lg' />
        </div>
      )}
    </li>
  );
}

export default Task;
