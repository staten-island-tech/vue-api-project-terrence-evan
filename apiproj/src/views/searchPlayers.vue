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
                    <h1 class="ranktitle">Ranked Solo</h1>
                    <div id="ranksoloimg"></div>
                    <h2 id="fillerranksolo">{{info.rankingSolo}}   {{info.soloLP}} LP</h2>
                </div>
                <div class="rankflex">
                    <h1 class="ranktitle">Ranked Flex</h1>
                    <div id="rankfleximg"></div>
                    <h2 id="fillerrankflex">{{info.rankingFlex}}   {{info.flexLP}} LP</h2>
                </div>
            </div>
            <div class="champinfo" v-for="(info, id) in summonerInfo" :key="id">
                <div class="mastery fourth">
                    <h1 class="label">4th</h1>
                    <img class="championimg" src="" id="fourth">
                    <h2 class="championname">{{info.top[3]}}</h2>
                    <h3 class="masterypoints">{{info.masteryPoints[3]}} points</h3>
                </div>
                <div class="mastery second">
                    <h1 class="label">2nd</h1>
                    <img class="championimg" src="" id="second">
                    <h2 class="championname">{{info.top[1]}}</h2>
                    <h3 class="masterypoints">{{info.masteryPoints[1]}} points</h3>
                </div>
                <div class="mastery first">
                    <h1 class="label">1st</h1>
                    <img class="championimg" src="" id="first">
                    <h2 class="championname">{{info.top[0]}}</h2>
                    <h3 class="masterypoints">{{info.masteryPoints[0]}} points</h3>
                </div>
                <div class="mastery third">
                    <h1 class="label">3rd</h1>
                    <img class="championimg" src="" id="third">
                    <h2 class="championname">{{info.top[2]}}</h2>
                    <h3 class="masterypoints">{{info.masteryPoints[2]}} points</h3>
                </div>
                <div class="mastery fifth">
                    <h1 class="label">5th</h1>
                    <img class="championimg" src="" id="fifth">
                    <h2 class="championname">{{info.top[4]}}</h2>
                    <h3 class="masterypoints">{{info.masteryPoints[4]}} points</h3>
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
                    soloLP: "",
                    flexLP: "",
                    rankingFlex:"",
                    top: [],
                    masteryPoints: []
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
                    document.getElementById("searchcontainer").style.width = "60vw"
                    document.getElementById("searchcontainer").style.height = "5vh"
                    document.getElementById("searchbar").style.fontSize = "1.75rem"
                    document.getElementsByClassName("fas")[0].style.fontSize = "2rem"
                    document.getElementById("infoPage").style.display = "flex"
                    document.getElementById("searchcontainer").style.marginTop = "12.5vh"
                    document.getElementById("mainlogo").style.display = "none";
                    // Finds user's main profile info to be used later
                    const requested = e.srcElement.value
                    const mainResponse = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${requested}?api_key=RGAPI-d295b5ba-73ab-4ae4-85ef-97261fa05294`)
                    const mainData = await mainResponse.json()
                    this.summonerInfo[0].level = mainData.summonerLevel
                    this.summonerInfo[0].username = mainData.name
                    document.getElementById("fillericon").style.backgroundImage = `url(http://ddragon.leagueoflegends.com/cdn/11.22.1/img/profileicon/${mainData.profileIconId}.png)`
                    // Get rank data based on summoner ID, Never again
                    const rankResponse = await fetch(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${mainData.id}?api_key=RGAPI-d295b5ba-73ab-4ae4-85ef-97261fa05294`)
                    const rankData = await rankResponse.json()
                    console.log(rankData)
                    if (rankData.length === 2 && rankData[0].queueType === "RANKED_FLEX_SR" && rankData[1].queueType === "RANKED_SOLO_5x5"){
                        const rankPlaceSolo = rankData[1].tier
                        const rankPlaceLowerSolo = rankPlaceSolo.charAt(0).toUpperCase() + rankPlaceSolo.slice(1).toLowerCase()
                        const rankSoloDivision = rankData[1].rank
                        const rankPlaceFlex = rankData[0].tier
                        const rankPlaceLowerFlex = rankPlaceFlex.charAt(0).toUpperCase() + rankPlaceFlex.slice(1).toLowerCase()
                        const rankFlexDivision = rankData[0].rank
                        const flexLP = rankData[0].leaguePoints
                        const soloLP = rankData[1].leaguePoints
                        if (rankPlaceSolo != "CHALLENGER"){
                            const rankSolo = `${rankPlaceLowerSolo} ${rankSoloDivision}`
                            this.summonerInfo[0].rankingSolo = rankSolo
                            const rankFlex = `${rankPlaceLowerFlex} ${rankFlexDivision}`
                            this.summonerInfo[0].rankingFlex = rankFlex
                            this.summonerInfo[0].soloLP = soloLP
                            this.summonerInfo[0].flexLP = flexLP
                        } else if (rankPlaceSolo === "CHALLENGER"){
                            const rankSolo = `${rankPlaceLowerSolo}`
                            this.summonerInfo[0].rankingSolo = rankSolo
                            const rankFlex = `${rankPlaceLowerFlex} ${rankFlexDivision}`
                            this.summonerInfo[0].rankingFlex = rankFlex
                            this.summonerInfo[0].soloLP = soloLP
                            this.summonerInfo[0].flexLP = flexLP
                        }
                        document.getElementById("ranksoloimg").style.backgroundImage = `url(${require(`../assets/${rankPlaceLowerSolo}.png`)})`
                        document.getElementById("rankfleximg").style.backgroundImage = `url(${require(`../assets/${rankPlaceLowerFlex}.png`)})`
                    } else if (rankData.length === 2 && rankData[1].queueType === "RANKED_FLEX_SR" && rankData[0].queueType === "RANKED_SOLO_5x5"){
                        const rankPlaceSolo = rankData[0].tier
                        const rankPlaceLowerSolo = rankPlaceSolo.charAt(0).toUpperCase() + rankPlaceSolo.slice(1).toLowerCase()
                        const rankSoloDivision = rankData[0].rank
                        const rankPlaceFlex = rankData[1].tier
                        const rankPlaceLowerFlex = rankPlaceFlex.charAt(0).toUpperCase() + rankPlaceFlex.slice(1).toLowerCase()
                        const rankFlexDivision = rankData[1].rank
                        const flexLP = rankData[1].leaguePoints
                        const soloLP = rankData[0].leaguePoints
                        if (rankPlaceSolo != "CHALLENGER"){
                            const rankSolo = `${rankPlaceLowerSolo} ${rankSoloDivision}`
                            this.summonerInfo[0].rankingSolo = rankSolo
                            const rankFlex = `${rankPlaceLowerFlex} ${rankFlexDivision}`
                            this.summonerInfo[0].rankingFlex = rankFlex
                            this.summonerInfo[0].soloLP = soloLP
                            this.summonerInfo[0].flexLP = flexLP
                        } else if (rankPlaceSolo === "CHALLENGER"){
                            const rankSolo = `${rankPlaceLowerSolo}`
                            this.summonerInfo[0].rankingSolo = rankSolo
                            const rankFlex = `${rankPlaceLowerFlex} ${rankFlexDivision}`
                            this.summonerInfo[0].rankingFlex = rankFlex
                            this.summonerInfo[0].soloLP = soloLP
                            this.summonerInfo[0].flexLP = flexLP
                        }                 
                        document.getElementById("ranksoloimg").style.backgroundImage = `url(${require(`../assets/${rankPlaceLowerSolo}.png`)})`
                        document.getElementById("rankfleximg").style.backgroundImage = `url(${require(`../assets/${rankPlaceLowerFlex}.png`)})`
                    } else if (rankData.length === 1 && rankData[0].queueType === "RANKED_SOLO_5x5"){
                        const rankPlaceSolo = rankData[0].tier
                        const rankPlaceLowerSolo = rankPlaceSolo.charAt(0).toUpperCase() + rankPlaceSolo.slice(1).toLowerCase()
                        const rankSoloDivision = rankData[0].rank
                        const soloLP = rankData[0].leaguePoints
                        if (rankPlaceSolo != "CHALLENGER"){
                            const rankSolo = `${rankPlaceLowerSolo} ${rankSoloDivision}`
                            this.summonerInfo[0].rankingSolo = rankSolo
                            this.summonerInfo[0].soloLP = soloLP
                        } else if (rankPlaceSolo === "CHALLENGER"){
                            const rankSolo = `${rankPlaceLowerSolo}`
                            this.summonerInfo[0].rankingSolo = rankSolo
                            this.summonerInfo[0].soloLP = soloLP
                        }
                        document.getElementById("ranksoloimg").style.backgroundImage = `url(${require(`../assets/${rankPlaceLowerSolo}.png`)})`
                        document.getElementById("rankfleximg").style.backgroundImage = "none"
                        this.summonerInfo[0].rankingFlex = "Unranked"
                    } else if (rankData.length === 1 && rankData[0].queueType === "RANKED_FLEX_SR"){
                        const rankPlaceFlex = rankData[0].tier
                        const rankPlaceLowerFlex = rankPlaceFlex.charAt(0).toUpperCase() + rankPlaceFlex.slice(1).toLowerCase()
                        const rankFlexDivision = rankData[0].rank
                        const flexLP = rankData[0].leaguePoints
                        if (rankPlaceFlex != "CHALLENGER"){
                            const rankFlex = `${rankPlaceLowerFlex} ${rankFlexDivision}`
                            this.summonerInfo[0].rankingFlex = rankFlex
                            this.summonerInfo[0].flexLP = flexLP
                        } else if (rankPlaceFlex === "CHALLENGER"){
                            const rankFlex = `${rankPlaceLowerFlex} ${rankFlexDivision}`
                            this.summonerInfo[0].rankingFlex = rankFlex
                            this.summonerInfo[0].flexLP = flexLP
                        }
                        document.getElementById("ranksoloimg").style.backgroundImage = "none"
                        document.getElementById("rankfleximg").style.backgroundImage = `url(${require(`../assets/${rankPlaceLowerFlex}.png`)})`
                        this.summonerInfo[0].rankingSolo = "Unranked"
                    } else if (rankData.length === 0) {
                        this.summonerInfo[0].rankingSolo = "Unranked omegalul"
                        document.getElementById("ranksoloimg").style.backgroundImage = "none"
                        this.summonerInfo[0].rankingFlex = "Unranked omegalul"
                        document.getElementById("rankfleximg").style.backgroundImage = "none"
                    }
                    // Gets champion mastery data
                    const championMasteryResponse = await fetch(`https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${mainData.id}?api_key=RGAPI-d295b5ba-73ab-4ae4-85ef-97261fa05294`)
                    const championMastery = await championMasteryResponse.json()
                    let userKeys = []
                    let points = []
                    championMastery.forEach(e => {
                        const championId = e.championId
                        const championMastery = e.championPoints
                        const comma = championMastery.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                        points.push(comma)
                        userKeys.push(championId)
                    });
                    this.summonerInfo[0].masteryPoints = points
                    let storage = []
                    let storageTop = []
                    let forImg = []
                    userKeys.forEach((key, index, array) => {
                        JSON.parse(JSON.stringify(this.reference)).forEach(championObj => {
                            if (championObj.id === `${key}`) {
                                storage.push(championObj.champion)
                            }         
                        })
                        if (index === array.length - 1) {
                            const temp = storage.slice(0,5)
                            temp.forEach(e => {
                                storageTop.push(e)
                                if (/\s/.test(e)){
                                    let text = e.replace(/ /g, "")
                                    forImg.push(text)
                                } else if (e.indexOf('\'') >= 0) {
                                    let text = e.replace(/'/, "")
                                    const newerText = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
                                    forImg.push(newerText)
                                } else {
                                    forImg.push(e)
                                }
                            })
                        } 
                    })
                    this.summonerInfo[0].top = storageTop
                    document.getElementById("first").src = `http://ddragon.leagueoflegends.com/cdn/11.23.1/img/champion/${forImg[0]}.png`
                    document.getElementById("second").src = `http://ddragon.leagueoflegends.com/cdn/11.23.1/img/champion/${forImg[1]}.png`
                    document.getElementById("third").src = `http://ddragon.leagueoflegends.com/cdn/11.23.1/img/champion/${forImg[2]}.png`
                    document.getElementById("fourth").src = `http://ddragon.leagueoflegends.com/cdn/11.23.1/img/champion/${forImg[3]}.png`
                    document.getElementById("fifth").src = `http://ddragon.leagueoflegends.com/cdn/11.23.1/img/champion/${forImg[4]}.png`
                    e.srcElement.value = ""
                }
            } catch (error) {
                console.log(error)
            }
        },
        getChampionInfo: async function(){
            try {
                const championDataResponse = await fetch("http://ddragon.leagueoflegends.com/cdn/11.22.1/data/en_US/champion.json")
                const championData = await championDataResponse.json()  
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
    background-color: #1f1f1f;
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
    width: 30vw;
    height: 15vh;
}
#fillername {
    color: white;
    font-size: 3rem;
    padding-left: 1rem;
    font-weight: normal;
    display: flex;
    align-items: center;
}
#fillerlevel{
    color: #c3b8b8;
    display: flex;
    align-items: center;
    width: 30vw;
    height: 7.5vh;
    font-size: 2rem;
    padding-left: 1rem;
}
.stuffcontainer{
    width: 100%;
    height: 65vh;
    display: flex;
    flex-direction: row;
}
.ranktitle{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
}
.rankinfo{
    border: 1px solid black;
    background-color: #292929;
    width: 30vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}
.ranksolo{
    display: flex;
    flex-direction: column;
    align-items: center;
}
#ranksoloimg{
    width: 10vw;
    height: 20vh;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
}
#fillerranksolo{
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
}
.rankflex{
    display: flex;
    flex-direction: column;
    align-items: center;
}
#rankfleximg{
    width: 10vw;
    height: 20vh;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
}
#fillerrankflex{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    color: white;
}
.champinfo{
    background-color: #292929;
    width: 70vw;
    height: 100%;
    border: 1px solid black;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
.mastery{
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}
.championname{
    font-size: 2rem;
    color: white;
}
.masterypoints{
    font-size: 2rem;
    color: #c3b8b8;
}
.championimg{
    width: 6vw;
    border-radius: 50%;
    border: 2px solid gold;
}
.first{
    width: 12vw;
    height: 45vh;
    background-color: #1f1f1f;
    position: relative;
    top: -7.5vh;
}
/* .first::after{
    content: "";
    position: absolute;
    border-left: 12vw solid transparent;
    border-right: 12vw solid transparent;
    border-top: 20vh solid white;
}*/
.second{
    width: 12vw;
    height: 45vh;
    background-color: #1f1f1f;
    position: relative;
    top: -5vh;
}
.third{
    width: 12vw;
    height: 45vh;
    background-color: #1f1f1f;
    position: relative;
    top: -2.5vh;
}
.fourth{
    width: 12vw;
    height: 45vh;
    background-color: #1f1f1f;
    position: relative;
}
.fifth{
    width: 12vw;
    height: 45vh;
    background-color: #1f1f1f;
    top: 2.5vh;
    position: relative;
}
.label{
    font-size: 2rem;
    color: white;
}


@media only screen and (max-width: 600px) {
.stuffcontainer {
    flex-direction: column;
    align-items: center;
}
.rankinfo {
    width: 90vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
.champinfo {
    width: 100vw;
    padding: 10rem;
}
.championimg{
    width: 10vw;
}

#ranksoloimg {
    width: 20vw;
    height: 10vh;
    margin: 1rem;
}

#rankfleximg {
    width: 20vw;
    height: 10vh;
    margin: 1rem;
}

#mainlogo{
    width: 50vw;
}

}
</style>