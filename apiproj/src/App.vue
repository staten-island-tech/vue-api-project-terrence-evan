<template>
  <div id="app">
    <nav id="nav">
      <router-link to="/">Home</router-link> |
      <router-link class="searchbar" to="/challenger">Leaderboard</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style>
*{
  font-size: 62.5%;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
#nav{
  width: 100vw;
  height: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.searchbar{
  padding-left: 3rem;
}
a{
  width: 10rem;
  font-size: 2.5rem;
}
</style>
