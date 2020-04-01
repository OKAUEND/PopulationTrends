<template>
  <div id="app">
    <topheader />
    <transition mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import Topheader from "@/views/Topheader.vue";
export default {
  name: "App",
  components: {
    Topheader
  }
};
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
}
</style>
