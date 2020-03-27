<template>
  <article class="populationschart">
    <highcharts :options="chartOptions"></highcharts>
  </article>
</template>

<script>
export default {
  name: "populationschart",
  props: {
    prefectures: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chartOptions: {
        lang: {
          noData: `都道府県を選択してください。`
        },
        chart: {
          type: "spline"
        },
        title: {
          text: "人口推移"
        },
        yAxis: {
          title: {
            text: "人口数"
          }
        },
        xAxis: {
          title: {
            text: "年度"
          },
          categories: [],
          min: 0.5
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "top"
        },
        series: [],
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500
              },
              chartOptions: {
                legend: {
                  align: "center",
                  verticalAlign: "bottom",
                  layout: "horizontal"
                }
              }
            }
          ]
        },
      }
    };
  },
  async mounted() {
    const years = await this.axios
      .get(
        "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=1",
        {
          headers: { "X-API-KEY": process.env.VUE_APP_apikey }
        }
      )
      .then(response => {
        return response.data.result.data[0].data.map(data => {
          return data.year;
        });
      });
    this.chartOptions.xAxis.categories = years;
  },
  watch: {
    async prefectures(newPrefectures) {
      const populations = await Promise.all(
        newPrefectures.map(async Prefecture => {
          const populationdetail = await this.axios
            .get(
              `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${Prefecture.prefCode}`,
              {
                headers: { "X-API-KEY": process.env.VUE_APP_apikey }
              }
            )
            .then(response => {
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
      this.chartOptions = { ...this.chartOptions, series: populations };
    }
  }
};
</script>

<style scoped lang="scss">
.populationschart {
  width: 100%;
  @media screen and (min-width: 761px) {
    width: 80%;
    margin: 0 auto;
  }
}
</style>
