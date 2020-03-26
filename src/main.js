import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxions from "vue-axios";
import Highcharts from "highcharts";
import HighchartsVue from "highcharts-vue";

Vue.config.productionTip = false;

Vue.use(VueAxions, axios);
Vue.use(HighchartsVue);

Highcharts.setOptions({
  lang: {
    numericSymbols: null
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
