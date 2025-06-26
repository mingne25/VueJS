import { rest } from 'msw';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const handlers = [
  rest.get(`${API_URL}/todos`, (req, res, ctx) => {
    const limit = req.url.searchParams.get('_limit') || 10;
    const todos = Array.from({ length: limit }, (_, i) => ({
      id: i + 1,
      title: `Mock Task ${i + 1}`,
      completed: false
    }));
    return res(ctx.status(200), ctx.json(todos));
  }),
  rest.get(`${API_URL}/todos/:id`, (req, res, ctx) => {
    const id = req.params.id;
    return res(ctx.status(200), ctx.json({ id: Number(id), title: `Mock Task ${id}`, completed: false }));
  }),
  rest.post(`${API_URL}/todos`, (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ id: 11, ...req.body }));
  }),
  rest.put(`${API_URL}/todos/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: Number(req.params.id), ...req.body }));
  }),
  rest.delete(`${API_URL}/todos/:id`, (req, res, ctx) => {
    return res(ctx.status(200));
  })
];