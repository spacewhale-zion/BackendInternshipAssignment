import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import type { User,Task } from '../types'; // Import our types


const Dashboard = () => {
  // Use types for state
  const [tasks, setTasks] = useState<Task[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [title, setTitle] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  // Fetch user and tasks on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!localStorage.getItem('token')) {
          navigate('/login');
          return;
        }

        // Define expected response types
        const userRes = await api.get<User>('/auth/me');
        setUser(userRes.data);

        const tasksRes = await api.get<Task[]>('/tasks');
        setTasks(tasksRes.data);
      } catch (err) {
        setError('Failed to load data. Please log in again.');
        localStorage.removeItem('token');
        navigate('/login');
      }
    };
    fetchData();
  }, [navigate]); // navigate is a stable dependency

  // Handle task creation
  const handleCreateTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post<Task>('/tasks', { title });
      setTasks([res.data, ...tasks]); // Add new task to the top
      setTitle(''); // Clear input
    } catch (err) {
      setError('Failed to create task.');
    }
  };

  // Handle task deletion
  const handleDeleteTask = async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      setError('Failed to delete task.');
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Welcome, {user.name} ({user.role})</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <h3>Create New Task</h3>
      <form onSubmit={handleCreateTask}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          required
        />
        <button type="submit">Add Task</button>
      </form>

      <h3>Your Tasks</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} ({task.status})
            <button onClick={() => handleDeleteTask(task._id)} style={{marginLeft: '10px'}}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;