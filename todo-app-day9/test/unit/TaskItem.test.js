import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import TaskItem from '@/components/TaskItem.vue';

describe('TaskItem.vue', () => {
  it('renders task title and status', () => {
    const task = { id: 1, title: 'Test Task', completed: false };
    const wrapper = mount(TaskItem, { props: { task } });
    expect(wrapper.text()).toContain('Test Task');
    expect(wrapper.find('input[type="checkbox"]').element.checked).toBe(false);
  });

  it('emits toggle event when checkbox is changed', async () => {
    const task = { id: 1, title: 'Test Task', completed: false };
    const wrapper = mount(TaskItem, { props: { task } });
    await wrapper.find('input[type="checkbox"]').setValue(true);
    expect(wrapper.emitted('toggle')).toBeTruthy();
    expect(wrapper.emitted('toggle')[0][0]).toBe(1);
  });

  it('emits delete event when delete button is clicked', async () => {
    const task = { id: 1, title: 'Test Task', completed: false };
    const wrapper = mount(TaskItem, { props: { task } });
    await wrapper.findAll('button').at(1).trigger('click');
    expect(wrapper.emitted('delete')).toBeTruthy();
    expect(wrapper.emitted('delete')[0][0]).toBe(1);
  });

  it('emits edit event when edit button is clicked', async () => {
    const task = { id: 1, title: 'Test Task', completed: false };
    const wrapper = mount(TaskItem, { props: { task } });
    await wrapper.findAll('button').at(0).trigger('click');
    expect(wrapper.emitted('edit')).toBeTruthy();
    expect(wrapper.emitted('edit')[0][0]).toEqual(task);
  });

  it('uses v-memo to prevent unnecessary re-renders', async () => {
    const task = { id: 1, title: 'Test Task', completed: false };
    const wrapper = mount(TaskItem, { props: { task } });
    const span = wrapper.find('span');
    const initialHtml = span.html();
    await wrapper.setProps({ task: { id: 1, title: 'Test Task', completed: false } });
    expect(span.html()).toBe(initialHtml); // Không re-render
    await wrapper.setProps({ task: { id: 1, title: 'New Title', completed: false } });
    expect(span.html()).not.toBe(initialHtml); // Re-render do title thay đổi
  });
});