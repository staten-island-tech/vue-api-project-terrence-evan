<template>
 <div>
  <div id="championText"> {{champion.name}} </div>
  <img id="championImage" :src="sprite" >
  </div> 
</template>

<script>
export default {
    name: "championComp",
    props: ["champion"],
    data() {
        return {
        }
    },
    methods: {
    },
    computed: {
        sprite: function() {
          return `http://ddragon.leagueoflegends.com/cdn/11.23.1/img/champion/${this.champion.id}.png`
        }
    }
}
</script>

<style>
#championImage {
    width: 8vw;
    margin: 1rem;
}

#championText{
    font-size: 2rem;
    color: #E0D5D5;
}
</style>