<template>
  <section id="searchpage">
    <div id="searchcontainer">
        <input id="searchbar" type="text" placeholder="Search..." @keyup="run">
        <button class="button" type="submit"><i class="fas fa-search"></i></button>
    </div>
    <div id="infoPage" v-for="(info, id) in summonerInfo" :key="id">
        <div class="profilenav">
            <div id="fillericon"></div>
            <div class="infocontainer">
                <h1 id="fillername">{{info.username}}</h1>
                <div id="fillerlevel">Level {{info.level}}</div>
            </div>
        </div>
        <div class="rankinfo">
            <div class="ranksolo">
                <img id="ranksoloimg">
                <div id="fillerranksolo"></div>
            </div>
            <div class="rankflex">
                <img id="rankfleximg">
                <div id="fillerrankflex"></div>
            </div>
        </div>
        <div class="champinfo">

        </div>
    </div>
  </section>
</template>

<script>
export default {
    name: "searchbar",
    data() {
        return {
            summonerInfo:[
                {
                    username:"",
                    level:"",
                    ranking: ""
                }
            ]
        }
    },
    methods: {
        run: async function(e){
            try {
                if(e.key === "Enter"){
                    // Adjusts some HTML
                    document.getElementById("searchcontainer").style.width = "75rem"
                    document.getElementById("searchcontainer").style.height = "4vh"
                    document.getElementById("searchbar").style.fontSize = "1.75rem"
                    document.querySelector(".fas").style.fontSize = "2rem"
                    document.getElementById("infoPage").style.display = "flex"
                    // Finds user's main profile info to be used later
                    const requested = e.srcElement.value
                    const mainResponse = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${requested}?api_key=RGAPI-f07b1a5d-1a9e-4ffb-87fe-5f19c858b137`)
                    const mainData = await mainResponse.json()
                    this.summonerInfo[0].level = mainData.summonerLevel
                    this.summonerInfo[0].username = mainData.name
                    document.getElementById("fillericon").style.backgroundImage = `url(http://ddragon.leagueoflegends.com/cdn/11.22.1/img/profileicon/${mainData.profileIconId}.png)`
                    // Get rank data based on summoner ID
                    const rankResponse = await fetch(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${mainData.id}?api_key=RGAPI-f07b1a5d-1a9e-4ffb-87fe-5f19c858b137`)
                    const rankData = await rankResponse.json()
                    const rankSoloImg = document.getElementById("ranksoloimg")
                    console.log(rankSoloImg)
                    if (rankData.length === 2 && rankData[0].queueType === "RANKED_FLEX_SR" && rankData[1].queueType === "RANKED_SOLO_5x5"){
                        const rankPlace = rankData[1].tier
                        const rankPlaceLower = rankPlace.charAt(0).toUpperCase() + rankPlace.slice(1).toLowerCase()
                        const rankSoloDivision = rankData[1].rank
                        if (rankPlace != "CHALLENGER"){
                            const rankSolo = `${rankPlaceLower} ${rankSoloDivision}`
                            this.summonerInfo[0].ranking = rankSolo
                        } else if (rankPlace === "CHALLENGER"){
                            const rankSolo = `${rankPlaceLower}`
                            this.summonerInfo[0].ranking = rankSolo
                        }
                        rankSoloImg.src = "../assets/Emblem_Gold.jpq"
                    } else if (rankData.length === 1 && rankData[0].queueType === "RANKED_SOLO_5x5"){
                        const rankPlace = rankData[0].tier
                        const rankSoloDivision = rankData[0].rank
                        if (rankPlace != "CHALLENGER"){
                            const rankSolo = `${rankPlace} ${rankSoloDivision}`
                            this.summonerInfo[0].ranking = rankSolo
                        } else if (rankPlace === "CHALLENGER"){
                            const rankSolo = `${rankPlace}`
                            this.summonerInfo[0].ranking = rankSolo
                        }
                    } else if (rankData.length === 1 && rankData[0].queueType === "RANKED_FLEX_SR"){
                        this.summonerInfo[0].ranking = "Unranked Solo"
                    } else if (rankData.length === 0) {
                        this.summonerInfo[0].ranking = "Unranked omegalul"
                    }
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
    margin-top: 12.5vh;
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
    width: 100%;
    height: 17.5vh;
    padding: 5rem;
    border: 1px solid black;
}
#fillericon{
    width: 15vh;
    height: 15vh;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    margin-right: 30px;
}
.infocontainer{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 70vw;
    height: 15vh;
}
#fillername {
    width: 70vw;
    height: 7.5vh;
    font-size: 3rem;
    padding-left: 1rem;
    font-weight: normal;
    display: flex;
    align-items: center;
}
#fillerlevel{
    display: flex;
    align-items: center;
    width: 30vw;
    height: 7.5vh;
    font-size: 2rem;
    padding-left: 1rem;
}
.rankinfo{
    width: 30vw;
    height: 58vh;
    border: 1px solid black;
    padding-left: 5rem;
    padding-right: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}
.ranksolo{
    width: 22.5vw;
    height: 35vh;
    background-color: pink;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}
#ranksoloimg{
    width: 12.5vw;
    height: 20vh;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-color: red;
}
#fillerranksolo{
    width: 10vw;
    height: 5vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    background-color: green;
}
.rankflex{
    width: 22.5vw;
    height: 35vh;
    background-color: blue;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}
#rankfleximg{
    width: 12.5vw;
    height: 20vh;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-color: red;
}
#fillerrankflex{
    width: 10vw;
    height: 5vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    background-color: green;
}
</style>