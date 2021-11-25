<template>
  <section id="champion-display">
      <div class="champion-container">
          <div @click="button" v-for="champion in championArr" :key=champion.name  class="champion-box">
              <championComp :champion="champion" />
          </div>
      </div>
  </section>
</template>

<script>
import championComp from "../components/championComp"
export default {
data() {
    return {
        championArr: [],
    }
},
created: function () {
    this.fetchChampion();
},
methods: {
    fetchChampion: async function () {
      try {
        const response = await fetch(
          "https://ddragon.leagueoflegends.com/cdn/11.23.1/data/en_US/champion.json"
        );
        const data = await response.json();
        this.championArr = data.data;       
        console.log(data) 
      } catch(error) {
          console.log(error)
      }
    },
},
components: {
    championComp
}

}


</script>

<style>
#champion-display {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("../assets/background.png");
    background-position: center;
}

.champion-container {
    margin-top: 20vh;
    margin-bottom: 5vh;
    width: 90vw;
    background-color: #1f1f1f;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

}
.champion-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 15%;
    background-color: #292929;
    margin: 2rem;
}


</style>