<template>
  <transition-group name="task" tag="ul" class="mt-4">
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @toggle="$emit('toggle', task.id)"
      @delete="$emit('delete', task.id)"
    />
  </transition-group>
</template>


<script>
import TaskItem from './TaskItem.vue'

export default {
  props: ['tasks'],
  components: { TaskItem }
}
</script>

<style scoped>
.task-enter-active, .task-leave-active {
  transition: all 0.3s;
}
.task-enter-from, .task-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
.task-move {
  transition: transform 0.3s;
}
</style>
