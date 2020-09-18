import { createRequest, createStorageRequest } from '@/utils/axios-helper';

export const login = createRequest('/server/auth/login', {
  method: 'post',
  baseURL: process.env.BASE_URL,
  headers: {'Content-Type':'application/x-www-form-urlencoded'}
});

export const requestUserMenu = createRequest('/server/auth/menu', {
  baseURL: process.env.BASE_URL
});