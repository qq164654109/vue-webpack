import { createRequest } from '@/utils/axios-helper';

export const requestTest = createRequest('/server/test', {
  baseURL: process.env.BASE_URL
});