<template>
  <section id="searchpage">
    <div id="searchcontainer">
        <input id="searchbar" type="text" placeholder="Search..." v-on:keyup="test">
        <button class="button" type="submit"><i class="fas fa-search"></i></button>
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
    methods:{
        test: async function(e){
            if (e.key === "Enter"){
                const searchbar = document.getElementById("searchbar")
                const searchContainer = document.getElementById("searchcontainer")
                const searchPage = document.getElementById("searchpage")
                const requested = searchbar.value
                try {
                    // Gets Data
                    const response = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${requested}?api_key=RGAPI-f03be3fa-6049-4f7b-8023-0d902a89652b`)
                    const jsonify = await response.json()
                    this.summonerInfo = jsonify
                    console.log(jsonify);
                    // Creates new page 
                    if (searchPage.children.length === 1){
                        // Makes new div to contain info
                        searchContainer.style.width = "75rem"
                        searchContainer.style.height = "4rem"
                        searchContainer.style.marginTop = "2rem"
                        searchContainer.style.top = "0"
                        document.querySelector(".fas").style.fontSize = "2rem"
                        searchPage.style.justifyContent = "space-between"
                        const infoPage = document.createElement("div")
                        infoPage.style.width = "100%"
                        infoPage.style.height = "80vh"
                        searchPage.appendChild(infoPage)
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        },
    }
}
</script>

<style>
#searchpage{
    height: 90vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
#searchcontainer{
    width: 100rem;
    height: 10rem;
    display: flex;
    position: relative;
    top: -4rem;
}
#searchbar{
    width: 85%;
    height: 100%;
    font-size: 2.5rem;
    text-indent: 3rem;
    border-radius: 5rem 0 0 5rem;
}
.button{
    width: 15%;
    height: 100%;
    border-radius: 0 5rem 5rem 0;
    background-color: white;
}
.fas{
    font-size: 4rem;
}
</style>