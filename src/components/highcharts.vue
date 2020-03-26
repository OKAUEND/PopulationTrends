<template>
  <article>
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
        chart: {
          type: "spline"
        },
        title: {
          text: "人口推移"
        },
        yAxis: {
          title: {
            text: "人口数"
          },
          tickInterval: 500000
        },
        xAxis: {
          title: {
            text: "年度"
          },
          type: "datetime",
          labels: {
            format: `{value:%Y}`
          },
          tickInterval: Date.UTC(1970, 0, 1) - Date.UTC(1960, 0, 1)
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "top"
        },
        series: []
      }
    };
  },
  watch: {
    async prefectures(newPrefectures) {
      this.populations = await Promise.all(
        newPrefectures.map(async Prefecture => {
          const population = await this.axios
            .get(
              `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${Prefecture.prefCode}`,
              {
                headers: { "X-API-KEY": process.env.VUE_APP_apikey }
              }
            )
            .then(response => {
              return response.data.result.data[0];
            });
          return {
            population: population,
            PrefName: Prefecture.prefName,
            PrefCode: Prefecture.prefCode
          };
        })
      ).then(responses => {
        return Promise.resolve(responses);
      });
    }
  }
};
</script>

<style></style>
