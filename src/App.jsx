import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';

function App() {
  const initialTasks = [
    { id: 1, name: 'Task 1', priority: 2, dueDate: null, reminder: null },
    { id: 2, name: 'Task 2', priority: 3, dueDate: null, reminder: null },
    { id: 3, name: 'Task 3', priority: 1, dueDate: null, reminder: null },
  ];

  const [tasks, setTasks] = useState(initialTasks);
  const [sortOption, setSortOption] = useState('none');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const addTask = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const editTask = (taskId, newName, newPriority, newDueDate, newReminder) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            name: newName,
            priority: newPriority,
            dueDate: newDueDate,      // Update due date
            reminder: newReminder,    // Update reminder title
          }
        : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };
  

  const sortTasks = () => {
    if (sortOption === 'highToLow') {
      return tasks.slice().sort((a, b) => a.priority - b.priority);
    } else if (sortOption === 'lowToHigh') {
      return tasks.slice().sort((a, b) => b.priority - a.priority);
    } else if (sortOption === 'alphabetical') {
      return tasks.slice().sort((a, b) => a.name.localeCompare(b.name));
    } else {
      return tasks;
    }
  };

  return (
    <div className="App">
      <h1 className='bg-black text-white p-2 flex justify-center font-bold text-2xl sticky top-0'>My To-Do List</h1>
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="none">Sort by</option>
        <option value="highToLow">High to Low Priority</option>
        <option value="lowToHigh">Low to High Priority</option>
        <option value="alphabetical">Alphabetical</option>
      </select>
      <AddTask addTask={addTask} />
      <TaskList tasks={sortTasks()} deleteTask={deleteTask} editTask={editTask} />
    </div>
  );
}

export default App;
