<template>
  <section class="Topview">
    <h1 class="Topview__Title">都道府県別人口推移</h1>
    <prefecturelist v-model="Prefectures" />
    <populationschart :prefectures="Prefectures" />
  </section>
</template>

<script>
import prefecturelist from "@/components/PrefectureList.vue";
import populationschart from "@/components/PopulationsChart.vue";
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
    Prefectures: {
      /*
        @return   {Array}          - 選ばれた都道府県オブジェクトの配列
      */
      get() {
        return this.prefectures;
      },
      /*
        @param   {Object} value    - 個別の都道府県オブジェクト
      */
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
