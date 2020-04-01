<template>
  <div class="Header">
    <router-link tag="div" to="/" class="Header__Container">
      <h1 class="Header__Title">都道府県別人口推移</h1>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Topheader"
};
</script>

<style lang="scss" scoped>
.Header {
  height: 50px;

  &__Container {
    margin: 0 auto;
    width: 300px;
  }
  &__Title {
    line-height: 50px;
    cursor: pointer;
    text-align: center;
  }
}
</style>
