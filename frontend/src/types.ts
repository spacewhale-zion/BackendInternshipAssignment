
export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface Task {
  _id: string;
  user: string; // User ID
  title: string;
  description?: string;
  status: 'pending' | 'completed';
  createdAt: string; // ISO date string
}