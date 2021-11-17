<template>
    <div>
    <div
      class="challenger-container"
      v-for="(challenger, index) in challengers"
      :key="index"
    >
      <div class="challenger-column-small">
        <p class="player-number" id="name">{{ index + 1 }}</p>
      </div>

      <div class="challenger-column-name">
        <p class="player-text" id="name">{{ challenger.summonerName }}</p>
      </div>

      <div class="challenger-column-tier">
        <img class="player-icon" :src="image" />
        <p class="player-text">{{ tier }}</p>
      </div>

      <div class="challenger-column-points">
        <p class="player-text">{{ challenger.leaguePoints }} LP</p>
      </div>

      <div class="challenger-column-small">
        <p class="player-text">{{ challenger.wins }}</p>
      </div>

      <div class="challenger-column-small">
        <p class="player-text">{{ challenger.losses }}</p>
      </div>

      <div class="challenger-column-small">
        <div class="player-text">{{ Math.round((challenger.wins / (challenger.wins + challenger.losses)) * 100) }}%</div>
      </div>

    </div>
    </div>
</template>

<script>
export default {
    name: "leaderboard",
    props: ["challengers",], 
    created: function () {
    this.fetchData();
    },
    methods: {
    fetchData: async function () {
      try {
        const response = await fetch(
          "https://na1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=RGAPI-6a391073-a295-4421-8051-1be3dbbf8cc2"
        );
        const data = await response.json();
        this.challengers = data.entries;
        this.challengers.sort(function (a, b) {
          return b.leaguePoints - a.leaguePoints;
        });
        /*this puts every summonername into an array
        this.summonerNames = this.challengers.map(
          (challenger) => challenger.summonerName
        ); */
      } catch (error) {
        console.log(error);
      }
    },
  },
}
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