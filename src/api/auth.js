import { createRequest, createStorageRequest } from '@/utils/axios-helper';

export const getUserMenu = createStorageRequest('/server/user/menu', {
  baseURL: process.env.BASE_URL
});