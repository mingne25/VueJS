// src/api/axios.js
import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
})

export const getPosts = async () => {
  const res = await api.get('/posts')
  return res.data
}


export const createPost = async (post) => {
  const res = await api.post('/posts', {
    title: post.title,
    body: post.body,
    userId: post.userId,
  });
  return res.data;
};