import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL;

export const getTasks = async () => {
  try {
    const res = await axios.get(`${API_URL}/todos?_limit=10`);
    return res.data;
  } catch (error) {
    throw new Error('Không thể tải danh sách công việc');
  }
};

export const getTask = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/todos/${id}`);
    return res.data;
  } catch (error) {
    throw new Error('Không thể tải chi tiết công việc');
  }
};

export const createTask = async (task) => {
  try {
    const res = await axios.post(`${API_URL}/todos`, task);
    return { id: Math.floor(Math.random() * 1000), ...res.data }; // JSONPlaceholder không trả ID thực
  } catch (error) {
    throw new Error('Không thể tạo công việc');
  }
};

export const updateTask = async (id, task) => {
  const payload = {
    id,
    title: task.title,
    completed: task.completed,
    userId: task.userId || 1
  };
  try {
    const res = await axios.put(`${API_URL}/todos/${id}`, payload);
    return res.data;
  } catch (error) {
    throw new Error('Không thể cập nhật công việc');
  }
};

export const deleteTask = async (id) => {
  try {
    await axios.delete(`${API_URL}/todos/${id}`);
  } catch (error) {
    throw new Error('Không thể xóa công việc');
  }
};