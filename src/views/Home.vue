<template>
  <div class="home">
    <prefecture-list @change="setPrefectures" />
    <high-charts :prefectures="prefectures" />
  </div>
</template>

<script>
import PrefectureList from "@/components/PrefectureList.vue";
import HighCharts from "@/components/highcharts.vue";
export default {
  name: "Home",
  components: {
    PrefectureList,
    HighCharts
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
