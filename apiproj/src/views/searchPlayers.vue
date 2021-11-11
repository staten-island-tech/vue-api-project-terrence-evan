<template>
  <section id="searchpage">
    <div id="searchcontainer">
        <input id="searchbar" type="text" placeholder="Search..." @keyup="run">
        <button class="button" type="submit"><i class="fas fa-search"></i></button>
    </div>
    <div id="infoPage" v-for="(info, id) in summonerInfo" :key="id">
        <div class="profilenav">
            <div id="fillericon"></div>
            <h1 id="fillername">{{info}}</h1>
            <div id="filler">{{level}}</div>
        </div>
    </div>
  </section>
</template>

<script>
export default {
    name: "searchbar",
    data() {
        return {
            summonerInfo: {
                username: {},
                level:{}
            }
        }
    },
    methods: {
        run: async function(e){
            try {
                if(e.key === "Enter"){
                    document.getElementById("searchcontainer").style.width = "75rem"
                    document.getElementById("searchcontainer").style.height = "4vh"
                    document.querySelector(".fas").style.fontSize = "2rem"
                    document.getElementById("infoPage").style.display = "flex"
                    const requested = e.srcElement.value
                    const response = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${requested}?api_key=RGAPI-f03be3fa-6049-4f7b-8023-0d902a89652b`)
                    const data = await response.json()
                    this.summonerInfo.username = data.name
                    this.summonerInfo.level = data.summonerLevel
                    document.getElementById("fillericon").style.backgroundImage = `url(http://ddragon.leagueoflegends.com/cdn/11.22.1/img/profileicon/${data.profileIconId}.png)`
                    document.getElementById("infoPage").style.backgroundColor = "red"
                    e.srcElement.value = ""
                }
            } catch (error) {
                console.log(error);
            }
        }
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
    height: 10vh;
    display: flex;
    position: relative;
    margin-top: 10px;
    margin-bottom: 10px;
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
#infoPage{
    display: none;
    flex-direction: column;
    height: 90vh;
    width: 100%;
}
.profilenav{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 25vh;
    background-color: pink;
}
#fillericon{
    width: 20vh;
    height: 20vh;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    margin-right: 10px;
}
#fillername{
    width: 20vh;
    height: 9vh;
    font-size: 4rem;
}
</style>