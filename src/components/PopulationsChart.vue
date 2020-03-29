<template>
    <p class="PopulationsChart__Message">{{ errormessage }}</p>
    <base-chart :xAxiscategory="years" :seriesdata="populations" />
  </article>
</template>

<script>
import BaseChart from "@/components/Base/BaseChart.vue";
import axios from "axios";
import message from "@/assets/message.json";
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
    //処理の開始地点でエラークラスのインスタントを作成し、スタックする
    const err = new Error();
    const result = await this.fetchPopulation("1", err).catch(error => {
      console.error(error);
    });

    //エラーで処理が中断されたとき、resultには何も入ってないのでここでガードする
    if (!result) {
      return;
    }

    this.years = result.data.map(data => {
      return data.year;
    });
  },
  watch: {
    async prefectures(newPrefectures) {
      //処理の開始地点でエラークラスのインスタントを作成し、スタックする
      const err = new Error();
      this.populations = await Promise.all(
        newPrefectures.map(Prefecture => {
          return this.fetchPopulation(Prefecture.prefCode, err).then(result => {
            const population = result.data.map(population => {
              return population.value;
            });
            return Promise.resolve({
              data: population,
              name: Prefecture.prefName,
              PrefCode: Prefecture.prefCode
            });
          });
        })
      )
        .then(responses => {
          return Promise.resolve(responses);
        })
        .catch(error => {
          console.error({ error });
          return;
        });
    }
  },
  methods: {
    async fetchPopulation(prefCode, err) {
      return await axios
        .get(
          `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`,
          {
            headers: { "X-API-KEY": process.env.VUE_APP_apikey }
          }
        )
        .then(response => {
          //非同期処理で場合は
          if (response.status > 500) {
            this.errormessage = message.Status5xx;
            err.message = message.Status5xx;
            throw err;
          } else if (
            response.data.statusCode === "403" ||
            response.data.statusCode === "404"
          ) {
            this.errormessage = message.Status403And404byChartpage;
            err.message = message.Status403And404byChartpage;
            throw err;
          } else if (response.data.statusCode === "429") {
            this.errormessage = message.Status429;
            err.message = message.Status429;
            throw err;
          }

          return response.data.result.data[0];
        });
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
