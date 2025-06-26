import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { setupServer } from 'msw/node';
import { handlers } from '../../mocks/handlers';
import TaskDetail from '../../src/views/TaskDetail.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { flushPromises } from '@vue/test-utils';

const server = setupServer(...handlers);

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/tasks/:id', component: TaskDetail }]
});

describe('TaskDetail.vue', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('fetches and renders task details', async () => {
    await router.push('/tasks/1');
    const wrapper = mount(TaskDetail, { global: { plugins: [router] } });
    await flushPromises();
    expect(wrapper.text()).toContain('Task 1');
    expect(wrapper.text()).toContain('Chưa hoàn thành');
  });

  it('displays loading state initially', () => {
    const wrapper = mount(TaskDetail, { global: { plugins: [router] } });
    expect(wrapper.text()).toContain('Đang tải...');
  });

  it('displays error state on fetch failure', async () => {
    server.use(
      rest.get('https://jsonplaceholder.typicode.com/todos/:id', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    await router.push('/tasks/1');
    const wrapper = mount(TaskDetail, { global: { plugins: [router] } });
    await flushPromises();
    expect(wrapper.text()).toContain('Không thể tải chi tiết công việc');
  });
});