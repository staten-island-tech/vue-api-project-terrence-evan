<template>
  <section id="challenger-display">
      <div class="challenger-container-header">
          <div class="challenger-column">
            <p class="section-text">Summoner</p>
          </div>

          <div class="challenger-column" id="tier">
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
      <div class="challenger-container" v-for="(challenger, id) in challengers" :key="id">
          <div class="challenger-column">
            <p class="player-text" id="name">{{challenger.summonerName}}</p>
          </div>

          <div class="challenger-column">
            <p class="player-text">{{tier}}</p>
          </div>

          <div class="challenger-column-points">
            <p class="player-text">{{challenger.leaguePoints}}</p>
          </div>

          <div class="challenger-column-small">
            <p class="player-text">{{challenger.wins}}</p>
          </div>

          <div class="challenger-column-small">
            <p class="player-text">{{challenger.losses}}</p>
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
            tier: "Challenger",
        }
    },
    created: function(){
        this.fetchData()
    },
    methods: {
        fetchData: async function(){
            try {
                const response = await fetch("https://na1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=RGAPI-af10ad3a-5a0e-44e6-a2c6-f053f28614a7")
                const data = await response.json()
                this.challengers = data.entries
                

                console.log(this.challengers);
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style>

.player-text{
    font-size: 2rem;
    padding: 1rem;
    color: #C3B8B8;
}

.section-text {
    font-size: 1.8rem;
    color: white;
}

#name {
    font-size: 2.5rem;
    color:#C3B8B8;
}


#challenger-display {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.5)), url("../assets/background.jpg");
    background-position: right -10% bottom 45%;
}


.challenger-container-header {
    width: 70vw;
    height: 6vh;
    display: flex;
    align-items: center;
    background-color: #292929;
    text-align: center;
    margin-top: 7rem;
}

.challenger-container {
    display: flex;
    width: 70vw;
    text-align: center;
}

.challenger-container:nth-child(2n+0) {
    background-color: #1f1f1f;
}

.challenger-container:nth-child(2n+1) {
    background-color: #292929;
}

.challenger-column {
    width: 30%;
}

.challenger-column-small {
    width: 10%;
}

.challenger-column-points {
    width: 20%;
}

#wins {
    width: 10%;
}

#losses {
    width: 10%;
}


</style>