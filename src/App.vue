<template>
  <v-app id="app">
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style scoped>
#app{
  /* background: url('/photo/bg.jpg') center */
  background: linear-gradient(270deg, #36D1DC 0%,#5B86E5 100%);
}
</style>
