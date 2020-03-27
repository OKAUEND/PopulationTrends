import Vue from "vue";
import VueRouter from "vue-router";
import Topview from "../views/Topview.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Topview",
    component: Topview
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
