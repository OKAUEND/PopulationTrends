import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxions from "vue-axios";
import Highcharts from "highcharts";
import HighchartsVue from "highcharts-vue";
import HighchartsNoData from "highcharts-no-data-to-display";
require("@/assets/scss/main.scss");

Vue.config.productionTip = false;

Vue.use(VueAxions, axios);
Vue.use(HighchartsVue);

Highcharts.setOptions({
  lang: {
    numericSymbols: null
  }
});

HighchartsNoData(Highcharts);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
