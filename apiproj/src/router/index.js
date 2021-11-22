import Vue from "vue";
import VueRouter from "vue-router";
import challengerNA from "../views/challengerPlayersNA.vue";
import search from "../views/searchPlayers.vue";
import challengerEUW from "../views/challengerPlayersEUW.vue";
import challengerOCE from "../views/challengerPlayersOCE.vue";
import challengerKR from "../views/challengerPlayersKR.vue";
import championList from "../views/championList.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: search,
  },
  {
    path: "/leaderboard/NA",
    component: challengerNA,
  },
  {
    path: "/leaderboard/EUW",
    component: challengerEUW,
  },
  {
    path: "/leaderboard/OCE",
    component: challengerOCE,
  },
  {
    path: "/leaderboard/KR",
    component: challengerKR,
  },
  {
    path: "/champions",
    component: championList
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
