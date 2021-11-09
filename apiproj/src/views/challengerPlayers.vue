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
                const response = await fetch("https://na1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=RGAPI-eeea740b-536c-472c-8c1b-2a79c819f8d5")
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

</style>