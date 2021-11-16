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
    </div>
    <div
      class="challenger-container"
      v-for="(challenger, index) in challengers"
      :key="index"
    >
      <div class="challenger-column-small">
        <p class="player-number" id="name">{{(index + 1)}}</p>
      </div>

      <div class="challenger-column-name">
        <p class="player-text" id="name">{{ challenger.summonerName }}</p>
      </div>

      <div class="challenger-column-tier">
        <img class="player-icon" :src="image">
        <p class="player-text">{{ tier }}</p>
      </div>

      <div class="challenger-column-points">
        <p class="player-text">{{ challenger.leaguePoints }}</p>
      </div>

      <div class="challenger-column-small">
        <p class="player-text">{{ challenger.wins }}</p>
      </div>

      <div class="challenger-column-small">
        <p class="player-text">{{ challenger.losses }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "challenger",
  data() {
    return {
      challengers: [],
      summonerNames: [],
      tier: "Challenger",
      image: "https://static.u.gg/assets/lol/ranks/2d/challenger.svg",
    };
  },
  created: function () {
    this.fetchData();
    this.fetchName();
  },
  methods: {
    fetchData: async function () {
      try {
        const response = await fetch(
          "https://na1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=RGAPI-6a391073-a295-4421-8051-1be3dbbf8cc2"
        );
        const data = await response.json();
        this.challengers = data.entries;
        this.challengers.sort(function(a, b) {
          return (b.leaguePoints) - (a.leaguePoints);
        })
        //this puts every summonername into an array
        this.summonerNames = this.challengers.map(challenger => ( challenger.summonerName))
      } catch (error) {
        console.log(error);
      }
    },

    fetchName: async function() {
    }
  },
  

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
