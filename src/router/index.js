import Vue from "vue";
import VueRouter from "vue-router";
import Topview from "../views/Topview.vue";
import ErrorPage from "@/components/ErrorPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Topview",
    component: Topview
  },
  {
    path: "/Error",
    name: "ErrorPage",
    component: ErrorPage
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
