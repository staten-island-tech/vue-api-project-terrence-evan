<template>
  <section id="challenger-display">
      <div class="e" v-for="(challenger, id) in challengers" :key="id">{{challenger.summonerName}}</div>
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
                const response = await fetch("https://na1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=RGAPI-e15451d2-d884-43e5-b466-9673880bf5f2")
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
.e{
    font-size: 2.5rem;
}
</style>