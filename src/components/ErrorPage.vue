<template>
  <section class="ErrorPage">
    <h1>{{ ErrorStatus }}</h1>
    <p>{{ ErrorMessage }}</p>
  </section>
</template>

<script>
export default {
  name: "ErrorPage",
  computed: {
    ErrorStatus() {
      return this.$store.getters.getErrorStatus;
    },
    ErrorMessage() {
      return this.$store.getters.getErrorMessage;
    }
  }
};
</script>

<style lang="scss" scoped>
.ErrorPage {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
}
</style>
