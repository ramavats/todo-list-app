import React from 'react';
import Task from './Task';

function TaskList({ tasks, deleteTask }) {
  return (
    <ul>
      {tasks.map((task) => (
        <Task key={task.id} task={task} deleteTask={deleteTask} />
      ))}
    </ul>
  );
}

export default TaskList;
