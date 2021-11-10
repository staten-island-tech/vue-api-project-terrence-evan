<template>
  <section id="challenger-display">
      <div class="challenger-container" v-for="(challenger, id) in challengers" :key="id">
          <div class="challenger-column">
            <p class="player-name">{{challenger.summonerName}}</p>
          </div>

          <div class="challenger-column">
            <p class="player-tier">{{data.tier}}</p>
          </div>

          <div class="challenger-column">
            <p class="player-points">{{challenger.leaguePoints}}</p>
          </div>
      </div>
  </section>
</template>

<script>
export default {
    name: "challenger",
    data() {
        return {
            challengers: []
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

.player-name{
    font-size: 2.5rem;
    border: solid red 0.1rem;
}

.player-points {
    font-size: 2rem;
}

#challenger-display {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 7rem;
}

.challenger-container {
    display: flex;
    width: 70vw;
    background-color: red;
}

.challenger-column {
    background-color: blue;
    width: 30%;
}



</style>