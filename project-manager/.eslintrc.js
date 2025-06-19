module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 2020,
    sourceType: 'module'
  },
    globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly'
  },
  rules: {
    'vue/multi-word-component-names': 'off' // Tắt rule tên component nhiều từ
  }
}