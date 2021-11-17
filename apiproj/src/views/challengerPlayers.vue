<template>
  <section id="challenger-display">
    <div class="challenger-container-header">
      <div class="challenger-column-small">
        <p class="section-text">Rank</p>
      </div>

      <div class="challenger-column-name" id="summoner">
        <p class="section-text">Summoners</p>
      </div>

      <div class="challenger-column-tier">
        <p class="section-text">Tier</p>
      </div>

      <div class="challenger-column-points">
        <p class="section-text">League Points</p>
      </div>

      <div class="challenger-column-small">
        <p class="section-text">Wins</p>
      </div>

      <div class="challenger-column-small">
        <p class="section-text">Losses</p>
      </div>

      <div class="challenger-column-small">
        <p class="section-text">Win Ratio</p>
      </div>
    </div>
  <leaderboard/>
  </section>
</template>

<script>
import leaderboard from "../components/leaderboard.vue"
export default {
  name: "challenger",
  data() {
    return {
      challengers: [],
      tier: "Challenger",
      image: "https://static.u.gg/assets/lol/ranks/2d/challenger.svg",
    };
  },
  methods: {
  },
  components: {
    leaderboard,
  }
};
</script>

<style>
.player-icon {
  width: 2vw;
}

.player-text {
  font-size: 2rem;
  padding: 1rem;
  color: #c3b8b8;
}

.section-text {
  font-size: 1.8rem;
  color: white;
}

#name {
  font-size: 2.5rem;
  color: #c3b8b8;
}

#challenger-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)),
    url("../assets/background.jpg");
  background-position: right -10% bottom 45%;
  padding-bottom: 5rem;
  padding-top: 16rem;
}

.challenger-container-header {
  width: 75vw;
  height: 6vh;
  display: flex;
  align-items: center;
  background-color: #292929;
  text-align: center;
}

.challenger-container {
  display: flex;
  width: 75vw;
  text-align: center;
  align-items: center;
}

.challenger-container:nth-child(2n + 0) {
  background-color: #1f1f1f;
}

.challenger-container:nth-child(2n + 1) {
  background-color: #292929;
}

.challenger-column-name {
  width: 30%;
  display: flex;
  align-items: center;
}

.challenger-column-tier {
  width: 20%;
  display: flex;
  align-items: center;
}

.challenger-column-small {
  width: 10%;
}

.challenger-column-points {
  width: 15%;
}
</style>
