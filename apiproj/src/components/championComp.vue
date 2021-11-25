<template>
<div>
    <div @click=toggle class="championWrapper">
        <div id="championText"> {{champion.name}} </div>
        <img id="championImage" :src="sprite" >
    </div> 
    <div class="championWrapper">
        <div v-if="active" class="champion-list">
            <p class="champion-title"> {{champion.title}}</p>
            <p id="champion-class" class="champion-title"> Class: {{champion.tags[0]}}  {{champion.tags[1]}}</p>
            <p id="champion-blurb"> {{champion.blurb}}</p>
        </div>
    </div>
</div>
  
</template>

<script>
export default {
    name: "championComp",
    props: ["champion"],
    data() {
        return {
            active: false,
        }
    },
    methods: {
    toggle() {
    this.active = !this.active
  },
    },
    computed: {
        sprite: function() {
          return `https://ddragon.leagueoflegends.com/cdn/11.23.1/img/champion/${this.champion.id}.png`
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
    color: white;
}

.championWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.champion-list {
    background-color: #171313;
    z-index: 2;
    position: absolute;
    max-width: 16vw;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.champion-title {
    font-size: 2rem;
    width: 15vw;
    color: white;
    padding: 0.5rem;
    text-transform: capitalize;
}

#champion-class {
    font-size: 1.6rem;
}

#champion-blurb {
    color: #c3b8b8;
    font-size: 1.1rem;
    padding: 1rem;
}
</style>