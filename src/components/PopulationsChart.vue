<template>
  <article class="populationschart">
    <base-chart :xAxiscategory="years" :seriesdata="populations" />
  </article>
</template>

<script>
import BaseChart from "@/components/Base/BaseChart.vue";
import axios from "axios";
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
      populations: []
    };
  },
  async mounted() {
    const years = await axios
      .get(
        "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=1",
        {
          headers: { "X-API-KEY": process.env.VUE_APP_apikey }
        }
      )
      .then(response => {
        //エラーステータスチェックを行い、エラー画面へ遷移するかをチェックする
        //catchだと取れないためここでする
        if (response.status > 500) {
          this.setStoreState(response.status);
          return;
        } else if (
          response.data.statusCode === "403" ||
          response.data.statusCode === "404" ||
          response.data.statusCode === "429"
        ) {
          this.setStoreState(response.data.statusCode);
          return;
        }

        return response.data.result.data[0].data.map(data => {
          return data.year;
        });
      })
      .catch(error => {
        console.error({ error });
      });
    this.years = years;
  },
  watch: {
    async prefectures(newPrefectures) {
      const populations = await Promise.all(
        newPrefectures.map(async Prefecture => {
          const populationdetail = await axios
            .get(
              `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${Prefecture.prefCode}`,
              {
                headers: { "X-API-KEY": process.env.VUE_APP_apikey }
              }
            )
            .then(response => {
              //エラーステータスチェックを行い、エラー画面へ遷移するかをチェックする
              //catchだと取れないためここでする
              if (response.status > 500) {
                this.setStoreState(response.status);
                return;
              } else if (
                response.data.statusCode === "403" ||
                response.data.statusCode === "404" ||
                response.data.statusCode === "429"
              ) {
                this.setStoreState(response.data.statusCode);
                return;
              }

              return response.data.result.data[0];
            });

          const population = populationdetail.data.map(population => {
            return population.value;
          });

          return {
            data: population,
            name: Prefecture.prefName,
            PrefCode: Prefecture.prefCode
          };
        })
      ).then(responses => {
        return Promise.resolve(responses);
      });
      this.populations = populations;
    }
  },
  methods: {
    setStoreState(status) {
      this.$store.commit("setErrorState", status);
      this.$router.push("/Error");
    }
  }
};
</script>

<style scoped lang="scss">
.populationschart {
  width: 100%;
  @media screen and (min-width: 781px) {
    width: 65%;
    margin: 0 auto;
  }
}
</style>
