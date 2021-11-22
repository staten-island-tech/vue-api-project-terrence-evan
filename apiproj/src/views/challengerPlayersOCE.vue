<template>
  <section id="challenger-display">
    <div class="challenger-container-header">
      <div class="challenger-column-first">
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
        <leaderboard :challengers ="challengers"/>
  </section>
</template>

<script>
import leaderboard from "../components/leaderboard.vue"
export default {
  name: "challenger",
  data() {
    return {
      challengers: [],
    };
  },
    created: function () {
    this.fetchData();
    },
  methods: {
        fetchData: async function () {
      try {
        const response = await fetch(
          "https://oc1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=RGAPI-d295b5ba-73ab-4ae4-85ef-97261fa05294"
        );
        const data = await response.json();
        this.challengers = data.entries;
        this.challengers.sort(function (a, b) {
          return b.leaguePoints - a.leaguePoints;
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  components: {
    leaderboard,
  }
};
</script>

<style>

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



</style>
