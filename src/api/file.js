import { createRequest } from '@/utils/axios-helper';

export const requestFileUpload = createRequest('/file/upload/{type}', {
  method: 'post',
  baseURL: process.env.BASE_URL
});