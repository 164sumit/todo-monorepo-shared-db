import axios from 'axios';
import { Task } from './taskSlice';

const API_URL = 'http://localhost:3001/api'; // Adjust this based on your Next.js API routes

export interface Todo {
  id: number;
  userId: number;
  title: string;
  description: string;
}

export const fetchTodosByUserId = async (userId: number): Promise<Task[]> => {
  const response = await axios.post(`${API_URL}/tasks`, { userId });
  return response.data;
};

export const createTodo1 = async (todo: Omit<Todo, 'id'>): Promise<Todo> => {
  const response = await axios.post(`${API_URL}/task`, todo);
  return response.data;
};

export const editTodo = async (todo: Todo): Promise<Todo> => {
  const response = await axios.put(`${API_URL}/tasks/${todo.id}`, todo);
  return response.data;
};

export const deleteTodo = async (todoId: number): Promise<void> => {
  await axios.delete(`${API_URL}/tasks/${todoId}`);
};