<template>
  <div id="app">
    <nav id="nav">
      <div class="nav-logo">
        <img class="nav-image" src="./assets/NEW LOGO.png">
      </div>
      <ul class="nav-list">
        <li><router-link class="nav-list-item" to="/">Home</router-link></li>
        <li><router-link class="nav-list-item" to="/leaderboards">Leaderboard</router-link></li>
        <li><div id="settings" class="nav-list-item"><i class="fas fa-user-cog"></i></div></li>
      </ul>
    </nav>
    <router-view/>
  </div>
</template>

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
  max-height: 10vh;

}
.nav-list {
  display: flex;
  align-items: center;
  list-style-type: none;
  height: 10vh;
  width: 100%;
}

.nav-list-item {
  padding: 0rem 2.5rem;
  text-decoration: none;
  color: #e3e3e3;
}

#nav li:last-of-type {
  margin-left: auto;
}

.fa-user-cog {
  font-size: 3rem;
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
  transition: all 0.2s;
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
#nav a{
  font-size: 2.5rem;

}
</style>
