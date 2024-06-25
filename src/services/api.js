import axios from 'axios';

const API_URL = 'https://playbuddy-3198da0e5cb7.herokuapp.com/api';

const api = {
  login: (formData) => axios.post(`${API_URL}/login`, formData),
  register: (formData) => axios.post(`${API_URL}/register`, formData),
  getUsers: () => axios.get(`${API_URL}/users`),
  getUserById: (id) => axios.get(`${API_URL}/users/${id}`),
  updateUser: (id, formData) => axios.patch(`${API_URL}/users/${id}`, formData),
  deleteUser: (id) => axios.delete(`${API_URL}/users/${id}`),
  getMatches: () => axios.get(`${API_URL}/matches`),
  createMatch: (formData) => axios.post(`${API_URL}/matches`, formData),
  deleteMatch: (id) => axios.delete(`${API_URL}/matches/${id}`),
  getMatchById: (id) => axios.get(`${API_URL}/matches/${id}`),
  getConversations: (id) => axios.get(`${API_URL}/messages/conversation/${id}`),
  sendMessage: (formData) => axios.post(`${API_URL}/messages`, formData),
  getMessagesBetween: (senderId, recipientId) => axios.get(`${API_URL}/messages/conversation/${senderId}/${recipientId}`),
  updateMessage: (id, formData) => axios.patch(`${API_URL}/messages/${id}`, formData),
  deleteMessage: (id) => axios.delete(`${API_URL}/messages/${id}`),
  getSwipes: () => axios.get(`${API_URL}/swipes`),
  createSwipe: (formData) => axios.post(`${API_URL}/swipes`, formData),
  getSwipeById: (id) => axios.get(`${API_URL}/swipes/${id}`),
  updateSwipe: (id, formData) => axios.patch(`${API_URL}/swipes/${id}`, formData),
  deleteSwipe: (id) => axios.delete(`${API_URL}/swipes/${id}`)
};

export default api;
