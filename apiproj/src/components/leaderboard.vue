<template>
    <div>
      <div
        class="challenger-container"
        v-for="(challenger, index) in challengers"
        :key="index"
      >
        <div class="challenger-column-first">
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
    props: ["challengers"], 
    data() {
      return {
        tier: "Challenger",
       image: "https://static.u.gg/assets/lol/ranks/2d/challenger.svg",
      }
    },
    methods: {
  
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

.challenger-container {
  display: flex;
  width: 80vw;
  text-align: center;
  align-items: center;
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

.challenger-column-first {
  width: 10%;
}

.challenger-column-small {
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.challenger-column-points {
  width: 15%;
}

.challenger-container {
  display: flex;
  width: vw;
  text-align: center;
  align-items: center;
}

.challenger-container:nth-child(2n + 0) {
  background-color: #292929;
}

.challenger-container:nth-child(2n + 1) {
  background-color: #1f1f1f;
}

@media only screen and (min-width:300px) {

  #name {
    font-size: 1.8rem
  }

  .challenger-column-small {
    display: none;
  }

  .challenger-column-name {
    width: 40%;
  }

  .challenger-column-tier {
    width: 30%;
  }
  .challenger-column-points {
    width: 20%;
  }

  .challenger-container {
    width: 90vw;
  }

  }

@media only screen and (min-width: 481px) {

  .challenger-column-name {
    width: 40%;
  }
  
  .challenger-column-small {
    display: none;
  }

  .challenger-column-tier {
    width: 30%;
  }
  .challenger-column-points {
    width: 20%;
  }
}

@media only screen and (min-width: 600px) {
  
  #name {
    font-size: 2rem;
  }

  .challenger-column-name {
    width: 30%;
  }

  .challenger-column-small {
    display: flex;
  }

  .challenger-column-tier {
    width: 20%;
  }
  .challenger-column-points {
    width: 10%;
  }
  .challenger-column-small {
    width: 10%;
  }

  .challenger-container {
    width: 80vw;
  }
}

@media only screen and (min-width:801px) {
  #name {
    font-size: 2.5rem;
  }
}

</style>