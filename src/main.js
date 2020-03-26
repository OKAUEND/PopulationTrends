import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxions from "vue-axios";

Vue.config.productionTip = false;

Vue.use(VueAxions, axios);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
