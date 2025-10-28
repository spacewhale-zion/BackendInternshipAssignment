
export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface Task {
  _id: string;
  user: string;
  title: string;
  description?: string;
  status: 'pending' | 'completed';
  createdAt: string; 
}