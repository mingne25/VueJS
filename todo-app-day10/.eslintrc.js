module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended'
  ],
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly'
  },
  rules: {
    'vue/multi-word-component-names': 'off' // Nếu muốn tắt rule tên component nhiều từ
  }
}