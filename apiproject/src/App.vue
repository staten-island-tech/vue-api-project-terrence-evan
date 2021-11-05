<template>
  <section id="app">
    <button v-on:click="hi"></button>
  </section>
</template>

<script>
export default {
  name: "app",
  methods: {
    hi: function (){
      try {
        
      } catch (error) {
        console.log(error);
      }
    }
  },
}
</script>

<style>
button{
  width: 10rem;
}
</style>