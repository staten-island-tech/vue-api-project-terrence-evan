import Vue from "vue";
import VueRouter from "vue-router";
import challenger from "../views/challengerPlayers.vue";
import search from "../views/searchPlayers.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: challenger,
  },
  {
    path: "/",
    name: "Home",
    component: search,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
