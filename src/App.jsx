import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const initialTasks = [
    {
      id: 1,
      name: 'Task 1',
      priority: 2,
      dueDate: '2023-09-15',
      reminder: null,
      category: 'Work',
      tags: ['important', 'urgent'],
    },
    {
      id: 2,
      name: 'Task 2',
      priority: 3,
      dueDate: '2023-09-10',
      reminder: null,
      category: 'Personal',
      tags: ['meeting'],
    },
    {
      id: 3,
      name: 'Task 3',
      priority: 1,
      dueDate: '2023-09-20',
      reminder: null,
      category: 'Home',
      tags: ['shopping', 'chores'],
    },
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
    toast.success('Task added successfully');
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    toast.error('Task deleted!'); // Display an error notification
  };

  const editTask = (taskId, newName, newPriority, newDueDate, newReminder, newCategory, newTags ) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            name: newName,
            priority: newPriority,
            dueDate: newDueDate,      // Update due date
            reminder: newReminder,    // Update reminder title
            category: newCategory,
            tags: newTags,
          }
        : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    toast.info('Task updated successfully!')
  };
  

  const sortTasks = () => {
    if (sortOption === 'highToLow') {
      return tasks.slice().sort((a, b) => a.priority - b.priority);
    } else if (sortOption === 'lowToHigh') {
      return tasks.slice().sort((a, b) => b.priority - a.priority);
    } else if (sortOption === 'alphabetical') {
      return tasks.slice().sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'dueDate') {
      return tasks.slice().sort((a, b) => {
        // Parse due dates and compare
        const dateA = a.dueDate ? new Date(a.dueDate) : null;
        const dateB = b.dueDate ? new Date(b.dueDate) : null;
        if (dateA && dateB) {
          return dateA - dateB;
        } else if (dateA) {
          return -1;
        } else if (dateB) {
          return 1;
        }
        return 0;
      });
    } else {
      return tasks;
    }
  };

  return (
    <div className="App">
      <h1 className='bg-black text-white p-2 flex justify-center font-bold text-2xl sticky top-0'>My To-Do List</h1>
      <AddTask addTask={addTask} />
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="none">Sort by</option>
        <option value="highToLow">High to Low Priority</option>
        <option value="lowToHigh">Low to High Priority</option>
        <option value="alphabetical">Alphabetical</option>
        <option value="dueDate">Due Date</option> {/* Added option for due date */}
      </select>      
      <TaskList tasks={sortTasks()} deleteTask={deleteTask} editTask={editTask} />
      <ToastContainer />
    </div>
  );
}

export default App;
