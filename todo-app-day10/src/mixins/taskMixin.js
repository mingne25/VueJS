export default {
  data() {
    return {
      tasks: []
    };
  },
  methods: {
    addTask(task) { this.tasks.push(task); },
    deleteTask(id) { this.tasks = this.tasks.filter(t => t.id !== id); }
  }
};