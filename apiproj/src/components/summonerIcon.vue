<template>
    <div>
        <img class="player-icon" :src="gremlin">
    </div>
</template>

<script>
export default {
name:"summonerIcon",
props: ["challenger"],
singlePlayer: {},
created: function () {
    this.fetchIcon();
    },
methods: {
fetchIcon: async function () {
      try {
        const response2 = await fetch(
          `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${this.challenger.summonerName}?api_key=RGAPI-d295b5ba-73ab-4ae4-85ef-97261fa05294`
        );
        const result = await response2.json();
        this.singlePlayer = result;
        console.log(this.singlePlayer)
    } catch(error){
        console.log(error)
    }
    },
},
 
computed: {
    gremlin: function() {
          return `http://ddragon.leagueoflegends.com/cdn/11.23.1/img/profileicon/${this.singlePlayer.profileIconId}.png`
        }
}
}
</script>

<style>
.player-icon {
    width: 2vw;
}
</style>