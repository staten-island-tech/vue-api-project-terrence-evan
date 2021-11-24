<template>
<div>
    <div @click=button id="championWrapper">
        <div id="championText"> {{champion.name}} </div>
        <img id="championImage" :src="sprite" >
    </div> 
    <div v-if="show" class="champion-list">
        <p>Hi</p>
    </div>
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

#championWrapper {
    display: flex;
    flex-direction: column;
}

.champion-list {
    width: 15vw;
    height: 10vh;
    background-color: white;
}
</style>