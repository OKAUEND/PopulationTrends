<template>
  <div class="home">
    <prefecture-list @change="setPrefectures()" />
  </div>
</template>

<script>
import PrefectureList from "@/components/PrefectureList.vue";
export default {
  name: "Home",
  components: {
    PrefectureList
  },
  data() {
    return {
      selectprefectures: []
    };
  },
  methods: {
    setPrefectures(array) {
      this.selectprefectures = array;
    }
  }
};
</script>
