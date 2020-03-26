import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxions from "vue-axios";
import HighchartsVue from "highcharts-vue";

Vue.config.productionTip = false;

Vue.use(VueAxions, axios);
Vue.use(HighchartsVue);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
