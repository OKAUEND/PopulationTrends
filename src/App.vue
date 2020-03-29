<template>
  <div id="app">
    <transition mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<style lang="scss" scoped>
#app {
  height: 100%;
}
</style>
