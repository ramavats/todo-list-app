import React from 'react';
import Task from './Task';

function TaskList({ tasks, deleteTask, editTask }) {
  return (
    <ul>
      {tasks.map((task) => (
        <Task key={task.id} task={task} deleteTask={deleteTask} editTask={editTask} />
      ))}
    </ul>
  );
}

export default TaskList;
