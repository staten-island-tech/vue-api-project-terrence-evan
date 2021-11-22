<template>
  <div id="app">
    <nav id="nav">
      <div class="nav-logo">
        <img class="nav-image" src="./assets/NEW LOGO.png">
      </div>
      <ul class="nav-list">
        <li><router-link class="nav-list-item" to="/">Home</router-link></li>
        <li id="leaderboard"><a class="nav-list-item" @click="toggle">Leaderboard</a>
          <div v-if="active" class="dropdown">
            <router-link to="/leaderboard/NA" @click.native="close">North America</router-link>
            <router-link to="/leaderboard/EUW" @click.native="close">Europe West</router-link>
            <router-link to="/leaderboard/KR" @click.native="close">Korea</router-link>
            <router-link to="/leaderboard/OCE" @click.native="close">Oceania</router-link>
          </div>
        </li>
        <li><router-link class="nav-list-item" to="/champions">Champions</router-link></li>
      </ul>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: false,
    }
  },
methods: {
  toggle() {
    this.active = !this.active
  },
  close() {
    this.active = false
  }
}
}

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap');

html, body, *{
  font-size: 62.5%;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: 'roboto', sans-serif;
}
#nav{
  display: flex;
  width: 100%;
  height: 10vh;
  background-color: #121111;
  align-items: center;
  position: fixed;
}
.nav-image {
  width: 8vw;
}
.nav-list {
  display: flex;
  align-items: center;
  list-style-type: none;
  height: 8vh;
  width: 100%;
}

.nav-list-item {
  padding: 0rem 2.5rem;
  text-decoration: none;
  color: #e3e3e3;
  font-size: 2.5rem;
  cursor: pointer;
}

#leaderboard {
  float: left;
}

.dropdown {
  position: absolute;
  top: 0;
  background-color: #1f1f1f;
  width: 100%;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  display: flex;
  flex-direction: column;
  margin-top: 10vh;
}

.dropdown a {
  cursor: pointer;
  padding: 16px;
  font-size: 16px;
  color: white;
  padding: 12px 16px;
  text-decoration: none;
}

.dropdown a:hover {
  color: #B83333;
}

#nav li {
  height: 10vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

#nav li::after {
  content: '';
  height: 0.6rem;
  background-color: #B83333;
  width: 0%;
  display: block;
  position: absolute;
  bottom: 0;
}
#nav li:hover::after {
  width: 100%;
}

#nav li:hover .nav-list-item:not(#settings) {
  color: #EF5757;
}

@media only screen and (min-width:300px) {
  html,body, *{
    font-size: 35%
  }

  .dropdown a {
    font-size: 2rem
  }

    .nav-image {
    width: 15vw;
  }

  }

@media only screen and (min-width: 481px) {
  html,body,*{
    font-size: 40%;
}

  .nav-image {
    width: 15vw;
  }
}

@media only screen and (min-width: 600px) {
  html,body,*{ 
    font-size: 40%;
  }

  .nav-image {
    width: 8vw;
  }
}

@media only screen and (min-width:801px) {
  html,body,*{
    font-size: 55%
  }
}


@media only screen and (min-width: 1025px) {
  html,body,*{
    font-size: 62.5%;
  }
}


</style>
