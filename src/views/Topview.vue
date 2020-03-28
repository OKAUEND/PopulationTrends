<template>
  <section class="Topview">
    <h1 class="Topview__Title">都道府県別人口推移</h1>
    <prefecturelist v-model="setPrefectures" />
    <populationschart :prefectures="prefectures" />
  </section>
</template>

<script>
import prefecturelist from "@/components/prefectureList.vue";
import populationschart from "@/components/populationschart.vue";
export default {
  name: "Topview",
  components: {
    prefecturelist,
    populationschart
  },
  data() {
    return {
      prefectures: []
    };
  },
  computed: {
    setPrefectures: {
      get() {
        return this.prefectures;
      },
      set(value) {
        this.prefectures = value;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.Topview {
  width: 100%;
  @media screen and (min-width: 761px) {
    width: 70%;
    margin: 0 auto;
  }

  &__Title {
    height: 50px;
    text-align: center;
    line-height: 50px;
  }
}
</style>
