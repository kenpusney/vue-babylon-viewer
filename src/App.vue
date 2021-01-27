<template>
  <div id="app">
    <div ref="rendered"></div>
  </div>
</template>

<script>

import { load } from "./utils/viewer"

export default {
  name: 'App',
  components: {
  },

  async mounted() {
    const rendered = this.$refs.rendered;
    console.log(rendered)
    load(0, {}, rendered)
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
</style>
