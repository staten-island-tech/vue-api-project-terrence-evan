<template>
  <section id="champion-display">
      <div class="champion-container">
          <div v-for="champion in championArr" :key=champion.name  class="champion-box">
              <p class="champion-name">{{champion.name}}</p>
              <img src="">
          </div>
      </div>
  </section>
</template>

<script>
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
          "http://ddragon.leagueoflegends.com/cdn/11.23.1/data/en_US/champion.json"
        );
        const data = await response.json();
        this.championArr = data.data;       
        console.log(data) 
      } catch(error) {
          console.log(error)
      }
    }
},

}


</script>

<style>
#champion-display {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.champion-container {
    margin-top: 15vh;
    margin-bottom: 5vh;
    width: 90vw;
    background-color: gray;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

}
.champion-box {
    width: 12vw;
    height: 22vh;
    background-color: lightblue;
    margin: 2rem;
}

</style>