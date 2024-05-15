import axios from 'axios';
import { IBasicLoginInput, IBasicSignupInput } from '@dev-hub-monitor/types';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function BasicSignup (data: IBasicSignupInput) {
  try {
    return await apiClient.post('/signup/basic/', data);
  } catch (error) {
    throw new Error('Failed to save data');
  }
}
export async function BasicLogin (data: IBasicLoginInput) {
  try {
    const response = await apiClient.post('/login/basic/', data);
    return response;
  } catch (error) {
    throw new Error('Failed to Login data');
  }
}
export async function getUserData (token: string) {
  try {
    const response = await apiClient.get(`/user/${token}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to Login data');
  }
}
