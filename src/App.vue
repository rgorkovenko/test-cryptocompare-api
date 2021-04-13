<template>
  <div id="app">
    <card-price />
  </div>
</template>

<script>
import CardPrice from './components/CardPrice/CardPrice.vue';

export default {
  name: 'App',
  components: {
    CardPrice
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

button {
  display: inline-block;
  padding: 0.3em 1.2em;
  margin: 0 0.1em 0.1em 0;
  border: 0.16em solid rgba(255,255,255,0);
  border-radius: 2em;
  box-sizing: border-box;
  background-color: rgb(11, 194, 11);
  text-decoration: none;
  font-weight: 300;
  color:#FFFFFF;
  text-shadow: 0 0.04em 0.04em rgba(0,0,0,0.35);
  text-align: center;
  transition: all 0.2s;
}
button:hover{
  border-color: rgba(255,255,255,1);
}

button.disabled {
  background-color: lightgray;
  color: #2c3e50;
}

button.small {
  padding: 0.1em 0.6em;
  margin: 0 0.1em 0.1em 0;
}

input {
  border: none;
  border-bottom: 1px solid lightgray;
  padding: 0.3em 1.2em;
  margin: 0 0.1em 0.1em 0;
}
</style>
