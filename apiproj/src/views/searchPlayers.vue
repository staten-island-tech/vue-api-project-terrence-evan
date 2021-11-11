<template>
  <section id="searchpage">
      <div class="origin">
         <div class="searchcontainer">
            <input id="searchbar" type="text" placeholder="Search...">
            <button class="button" type="submit"><i class="fas fa-search" v-on:click="search"></i></button>
         </div>
      </div>
  </section>
</template>

<script>
export default {
    name: "searchbar",
    data() {
        return {
            summonerInfo: []
        }
    },
    created: function(){
        this.search()
    },
    methods:{
        search: async function(){
           const requested = document.getElementById("searchbar").value
           console.log(requested)
           try {
               if (requested != null){
                const response = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${requested}?api_key=RGAPI-33c0b8e9-6d1f-4924-8608-5bd652d4fad5`)
                const data = await response.json()
                this.summonerInfo = data
               }
           } catch (error) {
               console.log(error)
           }
        }
    }
}
</script>

<style>
#searchpage{
    width: 100%;
    height: 100%;
}
.origin{
    height: 90vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.searchcontainer{
    width: 30vw;
    height: 7vh;
    display: flex;
    position: relative;
    top: -4rem;
}
#searchbar{
    width: 25vw;
    height: 7vh;
    font-size: 2.5rem;
    text-indent: 1rem;
}
.button{
    width: 5vw;
    height: 7vh;
}
.fas{
    font-size: 4rem;
}
</style>