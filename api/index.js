import axios from 'axios';
import { getToken } from '../utils/firebase';

const apiV1 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

apiV1.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log(error);
    if (error.response.status === 401 || error.response.status === 403) {
      const token = await getToken();
      originalRequest.headers.Authorization = `Bearer ${token}`;
      return apiV1(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const setAuthToken = (token) => {
  apiV1.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const getSubjects = async () => {
  const response = await apiV1.get('/subjects');
  return response?.data;
};
export const getServices = async (parent, child) => {
  console.log(child);
  const response = await apiV1.get('/services', {
    params: {
      parent: parent,
      child: child,
    },
  });
  return response?.data;
};

export const getService = async (uid) => {
  const response = await apiV1.get(`/services/${uid}`);

  return response?.data;
};

export const getServiceTutor = async (tutorid) => {
  const response = await apiV1.get('/services/tutor', {
    params: {
      tutor: tutorid,
    },
  });
  return response?.data;
};

export const getCartItems = async (serviceIds) => {
  const response = await apiV1.get(
    `/services/cart/items?services=${serviceIds}`
  );
  return response?.data;
};

export const addService = async (data) => {
 
  const response = await apiV1.post('/services', data);
  return response?.data;
};
export const addComment = async (data) => {
  
  const response = await apiV1.post('/comment', data);
  return response?.data;
};

export const editService = async (id,data) => {
  
  const response = await apiV1.patch(`/services/${id}`, data);
  return response?.data;
};

export const getUser = async (uid) => {
  const response = await apiV1.get(`/users/authUser/${uid}`);
 
  return response?.data;
};

export const addUser = async (data) => {
  const response = await apiV1.post('/users', data);
  return response?.data;
};

export const editUser = async (id, data) => {
  const response = await apiV1.patch(`/users/${id}`, data);
  return response?.data;
};

export const receiveUser = async (id) => {
  const response = await apiV1.get(`/users/${id}`);
  console.log(response.data);
  return response?.data;
};

export const receiveServices = async () => {
  const response = await apiV1.get('/services');
  return response?.data;
};
export const getDashboard = async () => {
  const response = await apiV1.get('/dashboard');
  return response?.data;
};

export const getSingleDashboard = async (data) => {
  const response = await apiV1.get(`/dashboard/${data}`);
  return response?.data;
};

export const createPayment = async (data) => {
  const response = await apiV1.post('/payments/create-payment-intent', data);
  return response?.data;
};

export const getPaymentTopay = async (data) => {
  const response = await apiV1.get(`payments/payment/${data}/topay`);
  
  return response?.data;
};

export const updatePayment = async (data) => {
  const response = await apiV1.post('payments/confirmPayment', data);
  return response?.data;
};

export const createDashboards = async (data) => {
  const response = await apiV1.post('dashboard/register/student', data);
  return response?.data;
};

export const addSection = async (data) => {
  const response = await apiV1.post('/section', data);
  return response?.data;
};

export const deleteSection = async (data) => {
  const response = await apiV1.delete(`/section/${data}`);
  return response?.data;
};
