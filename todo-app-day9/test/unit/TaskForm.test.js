import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import TaskForm from '@/components/TaskForm.vue';

describe('TaskForm.vue', () => {
  it('renders form inputs', () => {
    const wrapper = mount(TaskForm);
    expect(wrapper.find('input[placeholder="Tiêu đề công việc"]').exists()).toBe(true);
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true);
    expect(wrapper.find('button').text()).toBe('Thêm');
  });

  it('emits add event with valid data', async () => {
    const wrapper = mount(TaskForm);
    await wrapper.find('input[placeholder="Tiêu đề công việc"]').setValue('New Task');
    await wrapper.find('input[type="checkbox"]').setValue(true);
    await wrapper.find('form').trigger('submit');
    expect(wrapper.emitted('add')).toBeTruthy();
    expect(wrapper.emitted('add')[0][0]).toEqual({ title: 'New Task', completed: true });
  });

  it('emits edit event when editing task', async () => {
    const wrapper = mount(TaskForm, {
      props: { task: { id: 1, title: 'Edit Task', completed: false } }
    });
    expect(wrapper.find('button').text()).toBe('Cập nhật');
    await wrapper.find('input[placeholder="Tiêu đề công việc"]').setValue('Updated Task');
    await wrapper.find('form').trigger('submit');
    expect(wrapper.emitted('edit')).toBeTruthy();
    expect(wrapper.emitted('edit')[0][0]).toEqual({ id: 1, title: 'Updated Task', completed: false });
  });

  it('shows alert for invalid data', async () => {
    const wrapper = mount(TaskForm);
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    await wrapper.find('form').trigger('submit');
    expect(alertSpy).toHaveBeenCalledWith('Tiêu đề là bắt buộc');
    expect(wrapper.emitted('add')).toBeFalsy();
    expect(wrapper.emitted('edit')).toBeFalsy();
    alertSpy.mockRestore();
  });

  it('resets form after submit', async () => {
    const wrapper = mount(TaskForm);
    await wrapper.find('input[placeholder="Tiêu đề công việc"]').setValue('New Task');
    await wrapper.find('form').trigger('submit');
    expect(wrapper.find('input[placeholder="Tiêu đề công việc"]').element.value).toBe('');
    expect(wrapper.find('input[type="checkbox"]').element.checked).toBe(false);
    expect(wrapper.find('button').text()).toBe('Thêm');
  });
});