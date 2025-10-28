import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext'; 
import type {  Task } from '../../types';


const DeleteIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const EditIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
);

const SaveIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);


const CancelIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);


const Dashboard = () => {
  const { user, logout } = useAuth();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const[newDescription,setNewDescription]=useState<string>('');
  const [editFormData, setEditFormData] = useState<{ title: string; description: string; status: 'pending' | 'completed' }>({
      title: '',
      description: '',
      status: 'pending'
  });
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  
  const [loading, setLoading] = useState<boolean>(true);
  const [createLoading, setCreateLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError('');
      try {
        const tasksRes = await api.get<Task[]>('/tasks');
        setTasks(tasksRes.data);
      } catch (err) {
        setError('Failed to load tasks.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTasks();
  }, []); 

  const handleCreateTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    
    setError('');
    setCreateLoading(true);
    try {
      const payload: { title: string; description?: string } = {
        title: newTitle.trim()
      };
      if (newDescription.trim()) {
        payload.description = newDescription.trim();
      }

      const res = await api.post<Task>('/tasks',payload);
      setTasks([res.data, ...tasks]);
      setNewTitle('');
      setNewDescription('');
    } catch (err) {
      setError('Failed to create task.');
    } finally {
      setCreateLoading(false);
    }
  };

  const handleDeleteTask = async (id: string) => {
    const originalTasks = tasks;
    setTasks(tasks.filter((task) => task._id !== id));
    
    try {
      await api.delete(`/tasks/${id}`);
    } catch (err) {
      setError('Failed to delete task. Reverting changes.');
      setTasks(originalTasks); 
    }
  };

  const handleEditClick = (task: Task) => {
      setEditingTaskId(task._id);
      setEditFormData({
          title: task.title,
          description: task.description || '', 
          status: task.status
      });
      setError(''); 
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setEditFormData({
          ...editFormData,
          [e.target.name]: e.target.value
      });
  };

 const handleCancelEdit = () => {
      setEditingTaskId(null);
      setError('');
  };

  const handleSaveEdit = async (taskId: string) => {
    if (!editFormData.title.trim()) {
        setError("Title cannot be empty.");
        return;
    }
    setError('');
    setUpdateLoading(true);
    try {
        const res = await api.put<Task>(`/tasks/${taskId}`, {
            title: editFormData.title.trim(),
            description: editFormData.description.trim(),
            status: editFormData.status
        });
        setTasks(tasks.map(task => (task._id === taskId ? res.data : task)));
        setEditingTaskId(null); 
    } catch (err) {
        setError('Failed to update task.');
    } finally {
        setUpdateLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
     return (
       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
         <p>No user data...</p>
       </div>
     );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {user.name}!
                </h1>
                <p className="text-gray-600 mt-1">
                  {user.role === 'admin' ? 'Administrator' : 'User'} • {tasks.length} task{tasks.length !== 1 ? 's' : ''}
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-500">Online</span>
                </div>
                 <button
                    onClick={logout}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 focus:outline-none"
                  >
                    Logout
                  </button>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Task</h3>
              <form onSubmit={handleCreateTask}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="newTitle" className="block text-sm font-medium text-gray-700 mb-1">
                      Task Title
                    </label>
                    <input
                      type="text"
                      id="newTitle" 
                      name="newTitle" 
                      placeholder="What needs to be done?"
                      value={newTitle} 
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTitle(e.target.value)} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="newDescription" className="block text-sm font-medium text-gray-700 mb-1">
                      Description (Optional)
                    </label>
                    <textarea
                      id="newDescription"
                      name="newDescription"
                      rows={3}
                      placeholder="Add more details..."
                      value={newDescription} 
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewDescription(e.target.value)} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={createLoading || !newTitle.trim()} 
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 px-4 rounded-md font-medium flex items-center justify-center transition duration-200 ease-in-out transform hover:scale-105 disabled:scale-100"
                  >
                    {createLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <PlusIcon />
                        <span className="ml-2">Add Task</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Your Tasks</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {tasks.length === 0 ? 'No tasks yet' : `${tasks.length} task${tasks.length !== 1 ? 's' : ''} in total`}
                </p>
              </div>

              {tasks.length === 0 ? (
                 <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h4>
                  <p className="text-gray-500">Get started by creating your first task!</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {tasks.map((task) => (
                    <div key={task._id} className="px-6 py-4 transition duration-150 ease-in-out">
                       {editingTaskId === task._id ? (
                            <div className="space-y-3">
                                <div>
                                    <input
                                        type="text"
                                        name="title"
                                        value={editFormData.title}
                                        onChange={handleEditChange}
                                        className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-medium text-gray-900"
                                        required
                                    />
                                </div>
                                <div>
                                    <textarea
                                        name="description"
                                        value={editFormData.description}
                                        onChange={handleEditChange}
                                        rows={2}
                                        placeholder="Add a description (optional)"
                                        className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-700"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <select
                                        name="status"
                                        value={editFormData.status}
                                        onChange={handleEditChange}
                                        className={`px-2.5 py-1 rounded-full text-xs font-medium border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${getStatusColor(editFormData.status)}`}
                                    >
                                        <option value="pending">pending</option>
                                        <option value="completed">completed</option>
                                    </select>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => handleSaveEdit(task._id)}
                                            disabled={updateLoading}
                                            className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                                            title="Save changes"
                                        >
                                           {updateLoading ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mx-auto"></div> : <SaveIcon />}
                                        </button>
                                         <button
                                            onClick={handleCancelEdit}
                                            disabled={updateLoading}
                                            className="inline-flex items-center p-1.5 border border-gray-300 rounded-full shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                            title="Cancel edit"
                                        >
                                            <CancelIcon />
                                        </button>
                                    </div>
                                </div>
                            </div>
                       ) : (
                            <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-3">
                                    <h4 className="text-md font-medium text-gray-900 truncate">
                                    {task.title}
                                    </h4>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                                    {task.status}
                                    </span>
                                </div>
                                {task.description && <p className="mt-1 text-sm text-gray-500">{task.description}</p>}
                                <p className="mt-1 text-xs text-gray-500">
                                    Created: {new Date(task.createdAt || '').toLocaleDateString()}
                                </p>
                                </div>
                                <div className="flex items-center space-x-2 ml-4">
                                   <button
                                        onClick={() => handleEditClick(task)}
                                        className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                                        title="Edit task"
                                    >
                                        <EditIcon />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTask(task._id)}
                                        className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
                                        title="Delete task"
                                    >
                                        <DeleteIcon />
                                    </button>
                                </div>
                            </div>
                       )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;