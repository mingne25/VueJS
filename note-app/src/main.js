import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: {
        primary: '#1976D2',
        accent: '#FF4081',
        warn: '#F44336',
      },
    },
  },
});

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app');