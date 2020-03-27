<template>
  <div class="home">
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
