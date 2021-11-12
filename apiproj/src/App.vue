<template>
  <div id="app">
    <nav id="nav">
      <div class="nav-logo">
        <img class="nav-image" src="./assets/rito games.jpg">
      </div>
      <ul class="nav-list">
        <li><router-link class="nav-list-item" to="/">Home</router-link></li>
        <li><router-link class="nav-list-item" to="/challenger">Leaderboard</router-link></li>
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
}

.nav-list-item {
  padding: 0rem 2.5rem;
  text-decoration: none;
  color: #e3e3e3;
  position: relative;
}
.nav-list-item:hover {
  color: #EF5757;
}
.nav-list-item::after {
  content: '';
  height: 0.5rem;
  background-color: #B83333;
  width: 0%;
  transition: all 0.3s;
  display: block;
  position: absolute;
  bottom: -1.8rem;
}
.nav-list-item:hover::after{
  width: 100%;
}
#nav a{
  font-size: 2.5rem;

}
</style>
