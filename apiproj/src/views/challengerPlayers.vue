<template>
  <section id="challenger-display">
        <p class="player-name" v-for="(challenger, id) in challengers" :key="id">{{challenger.summonerName}}</p>
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
}

</style>