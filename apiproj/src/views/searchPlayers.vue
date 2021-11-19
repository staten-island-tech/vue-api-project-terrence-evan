<template>
  <section id="searchpage">
    <img src="../assets/NEW LOGO.png" alt="" id="mainlogo">
    <div id="searchcontainer">
        <button class="button" type="submit"><i class="fas fa-search"></i></button>
        <input id="searchbar" type="text" placeholder="Enter username..." @keyup="website">
    </div>
    <div id="infoPage" v-for="(info, id) in summonerInfo" :key="id">
        <div class="profilenav">
            <div id="fillericon"></div>
            <div class="infocontainer">
                <h1 id="fillername">{{info.username}}</h1>
                <div id="fillerlevel">Level {{info.level}}</div>
            </div>
        </div>
        <div class="stuffcontainer">
            <div class="rankinfo">
                <div class="ranksolo">
                    <div id="ranksoloimg"></div>
                    <div id="fillerranksolo">{{info.rankingSolo}}</div>
                </div>
                <div class="rankflex">
                    <div id="rankfleximg"></div>
                    <div id="fillerrankflex">{{info.rankingFlex}}</div>
                </div>
            </div>
            <div class="champinfo" v-for="(info, id) in summonerInfo" :key="id">
                <div class="mastery fourth">
                    <h1 class="label">Fourth</h1>
                    <img class="championimg" src="" id="fourth">
                    <h2 class="championname">{{info.top[3]}}</h2>
                </div>
                <div class="mastery second">
                    <h1 class="label">Second</h1>
                    <img class="championimg" src="" id="second">
                    <h2 class="championname">{{info.top[1]}}</h2>
                </div>
                <div class="mastery first">
                    <h1 class="label">First</h1>
                    <img class="championimg" src="" id="first">
                    <h2 class="championname">{{info.top[0]}}</h2>
                </div>
                <div class="mastery third">
                    <h1 class="label">Third</h1>
                    <img class="championimg" src="" id="third">
                    <h2 class="championname">{{info.top[2]}}</h2>
                </div>
                <div class="mastery fifth">
                    <h1 class="label">Fifth</h1>
                    <img class="championimg" src="" id="fifth">
                    <h2 class="championname">{{info.top[4]}}</h2>
                </div>
            </div>
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
                    rankingSolo: "",
                    rankingFlex:"",
                    top: []
                }
            ],
            reference: []
        }
    },
    created: function(){
        this.getChampionInfo()
    },
    methods: {
        website: async function(e){
            try {
                if(e.key === "Enter"){
                    // Adjusts some HTML
                    document.getElementById("searchcontainer").style.width = "75rem"
                    document.getElementById("searchcontainer").style.height = "4vh"
                    document.getElementById("searchbar").style.fontSize = "1.75rem"
                    document.querySelector(".fa-search").style.fontSize = "2rem"
                    document.getElementById("infoPage").style.display = "flex"
                    document.getElementById("searchcontainer").style.marginTop = "12.5vh"
                    document.getElementById("mainlogo").style.display = "none";
                    // Finds user's main profile info to be used later
                    const requested = e.srcElement.value
                    const mainResponse = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${requested}?api_key=RGAPI-ae0de522-fbbf-40ed-afaf-77679ad1c5fe`)
                    const mainData = await mainResponse.json()
                    this.summonerInfo[0].level = mainData.summonerLevel
                    this.summonerInfo[0].username = mainData.name
                    document.getElementById("fillericon").style.backgroundImage = `url(http://ddragon.leagueoflegends.com/cdn/11.22.1/img/profileicon/${mainData.profileIconId}.png)`
                    // Get rank data based on summoner ID, Never again
                    const rankResponse = await fetch(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${mainData.id}?api_key=RGAPI-ae0de522-fbbf-40ed-afaf-77679ad1c5fe`)
                    const rankData = await rankResponse.json()
                    if (rankData.length === 2 && rankData[0].queueType === "RANKED_FLEX_SR" && rankData[1].queueType === "RANKED_SOLO_5x5"){
                        const rankPlaceSolo = rankData[1].tier
                        const rankPlaceLowerSolo = rankPlaceSolo.charAt(0).toUpperCase() + rankPlaceSolo.slice(1).toLowerCase()
                        const rankSoloDivision = rankData[1].rank
                        const rankPlaceFlex = rankData[0].tier
                        const rankPlaceLowerFlex = rankPlaceFlex.charAt(0).toUpperCase() + rankPlaceFlex.slice(1).toLowerCase()
                        const rankFlexDivision = rankData[0].rank
                        if (rankPlaceSolo != "CHALLENGER"){
                            const rankSolo = `${rankPlaceLowerSolo} ${rankSoloDivision}`
                            this.summonerInfo[0].rankingSolo = rankSolo
                            const rankFlex = `${rankPlaceLowerFlex} ${rankFlexDivision}`
                            this.summonerInfo[0].rankingFlex = rankFlex
                        } else if (rankPlaceSolo === "CHALLENGER"){
                            const rankSolo = `${rankPlaceLowerSolo}`
                            this.summonerInfo[0].rankingSolo = rankSolo
                            const rankFlex = `${rankPlaceLowerFlex}`
                            this.summonerInfo[0].rankingFlex = rankFlex
                        }
                        document.getElementById("ranksoloimg").style.backgroundImage = `url(${require(`../assets/${rankPlaceLowerSolo}.jpg`)})`
                        document.getElementById("rankfleximg").style.backgroundImage = `url(${require(`../assets/${rankPlaceLowerFlex}.jpg`)})`
                    } else if (rankData.length === 2 && rankData[1].queueType === "RANKED_FLEX_SR" && rankData[0].queueType === "RANKED_SOLO_5x5"){
                        const rankPlaceSolo = rankData[0].tier
                        const rankPlaceLowerSolo = rankPlaceSolo.charAt(0).toUpperCase() + rankPlaceSolo.slice(1).toLowerCase()
                        const rankSoloDivision = rankData[0].rank
                        const rankPlaceFlex = rankData[1].tier
                        const rankPlaceLowerFlex = rankPlaceFlex.charAt(0).toUpperCase() + rankPlaceFlex.slice(1).toLowerCase()
                        const rankFlexDivision = rankData[1].rank
                        if (rankPlaceSolo != "CHALLENGER"){
                            const rankSolo = `${rankPlaceLowerSolo} ${rankSoloDivision}`
                            this.summonerInfo[0].rankingSolo = rankSolo
                            const rankFlex = `${rankPlaceLowerFlex} ${rankFlexDivision}`
                            this.summonerInfo[0].rankingFlex = rankFlex
                        } else if (rankPlaceSolo === "CHALLENGER"){
                            const rankSolo = `${rankPlaceLowerSolo}`
                            this.summonerInfo[0].rankingSolo = rankSolo
                             const rankFlex = `${rankPlaceLowerFlex}`
                            this.summonerInfo[0].rankingFlex = rankFlex
                        }                 
                        document.getElementById("ranksoloimg").style.backgroundImage = `url(${require(`../assets/${rankPlaceLowerSolo}.jpg`)})`
                        document.getElementById("rankfleximg").style.backgroundImage = `url(${require(`../assets/${rankPlaceLowerFlex}.jpg`)})`
                    } else if (rankData.length === 1 && rankData[0].queueType === "RANKED_SOLO_5x5"){
                        const rankPlaceSolo = rankData[0].tier
                        const rankPlaceLowerSolo = rankPlaceSolo.charAt(0).toUpperCase() + rankPlaceSolo.slice(1).toLowerCase()
                        const rankSoloDivision = rankData[0].rank
                        if (rankPlaceSolo != "CHALLENGER"){
                            const rankSolo = `${rankPlaceLowerSolo} ${rankSoloDivision}`
                            this.summonerInfo[0].rankingSolo = rankSolo
                        } else if (rankPlaceSolo === "CHALLENGER"){
                            const rankSolo = `${rankPlaceLowerSolo}`
                            this.summonerInfo[0].rankingSolo = rankSolo
                        }
                        document.getElementById("ranksoloimg").style.backgroundImage = `url(${require(`../assets/${rankPlaceLowerSolo}.jpg`)})`
                        document.getElementById("rankfleximg").style.backgroundImage = "none"
                        this.summonerInfo[0].rankingFlex = "Unranked"
                    } else if (rankData.length === 1 && rankData[0].queueType === "RANKED_FLEX_SR"){
                        const rankPlaceFlex = rankData[0].tier
                        const rankPlaceLowerFlex = rankPlaceFlex.charAt(0).toUpperCase() + rankPlaceFlex.slice(1).toLowerCase()
                        const rankFlexDivision = rankData[0].rank
                        if (rankPlaceFlex != "CHALLENGER"){
                            const rankFlex = `${rankPlaceLowerFlex} ${rankFlexDivision}`
                            this.summonerInfo[0].rankingFlex = rankFlex
                        } else if (rankPlaceFlex === "CHALLENGER"){
                            const rankFlex = `${rankPlaceLowerFlex}`
                            this.summonerInfo[0].rankingFlex = rankFlex
                        }
                        document.getElementById("ranksoloimg").style.backgroundImage = "none"
                        document.getElementById("rankfleximg").style.backgroundImage = `url(${require(`../assets/${rankPlaceLowerFlex}.jpg`)})`
                        this.summonerInfo[0].rankingSolo = "Unranked"
                    } else if (rankData.length === 0) {
                        this.summonerInfo[0].rankingSolo = "Unranked omegalul"
                        document.getElementById("ranksoloimg").style.backgroundImage = "none"
                        this.summonerInfo[0].rankingFlex = "Unranked omegalul"
                        document.getElementById("rankfleximg").style.backgroundImage = "none"
                    }
                    // Gets champion mastery data
                    const championMasteryResponse = await fetch(`https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${mainData.id}?api_key=RGAPI-ae0de522-fbbf-40ed-afaf-77679ad1c5fe`)
                    const championMastery = await championMasteryResponse.json()
                    let userKeys = []
                    championMastery.forEach(e => {
                        const championId = e.championId
                        userKeys.push(championId)
                    });
                    let storage = []
                    let storageTop = []
                    userKeys.forEach((key, index, array) => {
                        JSON.parse(JSON.stringify(this.reference)).forEach(championObj => {
                            if (championObj.id === `${key}`) {
                                storage.push(championObj.champion)
                            }         
                        })
                        if (index === array.length - 1) {
                            storageTop.push(...storage.slice(0,5))
                        } 
                    })
                    this.summonerInfo[0].top = storageTop
                    document.getElementById("first").src = `http://ddragon.leagueoflegends.com/cdn/11.23.1/img/champion/${storageTop[0]}.png`
                    document.getElementById("second").src = `http://ddragon.leagueoflegends.com/cdn/11.23.1/img/champion/${storageTop[1]}.png`
                    document.getElementById("third").src = `http://ddragon.leagueoflegends.com/cdn/11.23.1/img/champion/${storageTop[2]}.png`
                    document.getElementById("fourth").src = `http://ddragon.leagueoflegends.com/cdn/11.23.1/img/champion/${storageTop[3]}.png`
                    document.getElementById("fifth").src = `http://ddragon.leagueoflegends.com/cdn/11.23.1/img/champion/${storageTop[4]}.png`
                    e.srcElement.value = ""
                }
            } catch (error) {
                window.alert("No such username exists")
            }
        },
        getChampionInfo: async function(){
            try {
                const championDataResponse = await fetch("http://ddragon.leagueoflegends.com/cdn/11.22.1/data/en_US/champion.json")
                const championData = await championDataResponse.json()  
                console.log(championData)
                Object.keys(championData.data).forEach((champion) => {
                        const test = championData.data[champion]
                        this.reference.push({ id: test.key, champion: test.name})
                })
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>

<style>
#searchpage{
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3)),
    url("../assets/main screen.jpg");
    background-size: cover;
    background-position: center;
}

#mainlogo{
    width: 25vw;
}

#maintext{
    font-size: 3rem;
    color: white;
}

#searchcontainer{
    width: 70vw;
    height: 7vh;
    display: flex;
    margin-bottom: 2vh;
}
#searchbar{
    width: 90%;
    height: 100%;
    font-size: 2.5rem;
    text-indent: 1rem;
    border-radius: 0 0.8rem 0.8rem 0;
    background-color: white;
    border: none;
}
.button{
    width: 10%;
    height: 100%;
    border-radius: 0.8rem 0 0 0.8rem;
    background-color: white;
    border: none;
}
.fa-search{
    font-size: 3rem;
}
#infoPage{
    display: none;
    flex-direction: column;
    height: 90vh;
    width: 100%;
    background-color: white;
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
.stuffcontainer{
    width: 100vw;
    height: 58vh;
    display: flex;
    flex-direction: row;

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
    height: 25vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}
#ranksoloimg{
    width: 10vw;
    height: 20vh;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}
#fillerranksolo{
    width: 20vw;
    height: 5vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
}
.rankflex{
    width: 22.5vw;
    height: 25vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}
#rankfleximg{
    width: 10vw;
    height: 20vh;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}
#fillerrankflex{
    width: 20vw;
    height: 5vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
}
.champinfo{
    width: 70vw;
    height: 58vh;
    border: 1px solid black;
    padding-left: 5rem;
    padding-right: 5rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
.mastery{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}
.championname{
    font-size: 2rem;
}
.championimg{
    width: 7vw;
    height: 12vh;
    border-radius: 50%;
}
.first{
    width: 12vw;
    height: 35vh;
    background-color: pink;
    position: relative;
    top: -6vh;
}
.second{
    width: 12vw;
    height: 35vh;
    background-color: pink;
    position: relative;
    top: -3vh;
}
.third{
    width: 12vw;
    height: 35vh;
    background-color: pink;
    position: relative;
    top: -3vh;
}
.fourth{
    width: 12vw;
    height: 35vh;
    background-color: pink;
    position: relative;
}
.fifth{
    width: 12vw;
    height: 35vh;
    background-color: pink;
    position: relative;
}
.label{
    font-size: 2rem;
}
</style>