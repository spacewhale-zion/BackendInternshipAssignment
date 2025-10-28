import api from '../api/axiosConfig'; // Your configured Axios instance
import { Entity } from '@/types'; // Define this type based on your model

export const createEntity = async (entityData: Omit<Entity, '_id' | 'createdBy' | 'createdAt' | 'updatedAt'>): Promise<Entity> => {
  const { data } = await api.post('/entities', entityData);
  return data;
};

export const getMyEntities = async (): Promise<Entity[]> => {
  const { data } = await api.get('/entities');
  return data;
};

export const getEntityById = async (id: string): Promise<Entity> => {
  const { data } = await api.get(`/entities/${id}`);
  return data;
};

export const updateEntity = async (id: string, updateData: Partial<Entity>): Promise<Entity> => {
  const { data } = await api.put(`/entities/${id}`, updateData);
  return data;
};

export const deleteEntity = async (id: string): Promise<{ message: string }> => {
  const { data } = await api.delete(`/entities/${id}`);
  return data;
};

// Example admin function
export const getAllEntitiesAdmin = async (): Promise<Entity[]> => {
  const { data } = await api.get('/admin/entities/all'); // Match backend route
  return data;
};