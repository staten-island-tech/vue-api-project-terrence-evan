import Vue from "vue";
import VueRouter from "vue-router";
import challenger from "../views/challengerPlayers.vue";
import search from "../views/searchPlayers.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: search,
  },
  {
    path: "/challenger",
    name: "challenger",
    component: challenger,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;