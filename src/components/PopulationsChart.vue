<template>
  <article class="PopulationsChart">
    <p class="PopulationsChart__Message">{{ errormessage }}</p>
    <base-chart :xAxiscategory="years" :seriesdata="populations" />
  </article>
</template>

<script>
import BaseChart from "@/components/Base/BaseChart.vue";
import RESAS from "@/RESAS.js";
export default {
  name: "PopulationsChart",
  props: {
    prefectures: {
      type: Array,
      required: true
    }
  },
  components: {
    BaseChart
  },
  data() {
    return {
      years: [],
      populations: [],
      errormessage: ""
    };
  },
  async mounted() {
    const api = new RESAS();

    const result = await api.fetchYears();

    //エラーで処理が中断されたとき、resultには何も入ってないのでここでガードする
    if (result.isError) {
      this.setStoreState(result.Status);
    }

    this.years = result;
  },
  watch: {
    /*
      @param   {Array} newPrefectures    - 選ばれた都道府県オブジェクトの配列
    */
    async prefectures(newPrefectures) {
      //storeにキャッシュ中の都道府県を、選択した配列から省く
      const storePrefCodes = this.$store.getters.getPopulationsPrefCode;
      const usePrefCodes = newPrefectures.filter(Prefecture => {
        return !storePrefCodes.includes(Prefecture.prefCode);
      });

      const api = new RESAS(usePrefCodes);

      //RESAS APIより人口推移を取得
      const Populations = await api.fetchPopulations();

      //キャッシュしているデータと結合する
      const concatPopulations = Populations.concat(
        this.$store.getters.getPopulations
      );

      //結合した配列を再キャッシュする
      this.$store.commit("setPopulations", concatPopulations);

      //選択した都道府県のみを表示するため、結合した配列から絞り込みを行う
      this.populations = concatPopulations.filter(Population => {
        return newPrefectures.some(
          Prefecture => Prefecture.prefCode === Population.PrefCode
        );
      });
    }
  },
  methods: {
    /*
      @param   {Number,String} status    - エラーステータス
    */
    setStoreState(status) {
      this.$store.commit("setErrorState", status);
      this.$router.push("/Error");
    }
  }
};
</script>

<style scoped lang="scss">
.PopulationsChart {
  width: 100%;
  @media screen and (min-width: $breakpoint_pc_lower_limit) {
    width: $container_pc_width;
    margin: 0 auto;
  }

  &__Message {
    color: #dc143c;
    font-weight: 800;
    font-size: 20px;
    text-align: center;
    word-break: keep-all;
  }
}
</style>
