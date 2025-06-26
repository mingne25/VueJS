export default {
  mounted(el, binding) {
    el.setAttribute('title', binding.value);
  }
};