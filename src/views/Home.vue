<template>
  <div class="Home">
    <prefecture-list @change="setPrefectures" />
    <populationschart :prefectures="prefectures" />
  </div>
</template>

<script>
import PrefectureList from "@/components/PrefectureList.vue";
import populationschart from "@/components/populationschart.vue";
export default {
  name: "Home",
  components: {
    PrefectureList,
    populationschart
  },
  data() {
    return {
      prefectures: []
    };
  },
  methods: {
    setPrefectures(array) {
      console.log(array);
      this.prefectures = array;
    }
  }
};
</script>

<style lang="scss" scoped>
.Home {
  width: 100%;
  @media screen and (min-width: 761px) {
    width: 70%;
    margin: 0 auto;
  }
}
</style>
