import React, { useState } from 'react';

function Task({ task, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskName, setEditedTaskName] = useState(task.name);
  const [editedTaskPriority, setEditedTaskPriority] = useState(task.priority);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate || '');         // Initialize with the task's due date
  const [editedReminder, setEditedReminder] = useState(task.reminder || '');      // Initialize with the task's reminder title

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Perform validation if needed
    if (editedTaskName.trim() === '') {
      return;
    }

    // Update the task and exit edit mode
    editTask(task.id, editedTaskName, editedTaskPriority, editedDueDate, editedReminder);
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

  const handleCancel = () => {
    // Reset the edited task fields and exit edit mode
    setEditedTaskName(task.name);
    setEditedTaskPriority(task.priority);
    setEditedDueDate(task.dueDate || '');
    setEditedReminder(task.reminder || '');
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <div>
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
          <button onClick={handleSave}>Save</button>
          <button className='bg-red-600 text-white font-bold px-2 rounded-lg py-1' onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <span>{task.name}</span>
          <span>{task.priority === 1 ? 'High' : task.priority === 2 ? 'Medium' : 'Low'}</span>
          {task.dueDate && <span>Due: {task.dueDate}</span>}
          {task.reminder && <span>Reminder: {task.reminder}</span>}
          <button className='btn bg-blue-800 text-white px-4 rounded-lg py-1 mx-2' onClick={handleEdit}>Edit</button>
          <button className='btn bg-red-600 text-white px-4 rounded-lg py-1 mx-2' onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      )}
    </li>
  );
}

export default Task;
