<template>
  <highcharts :options="setchartOptions"></highcharts>
</template>

<script>
export default {
  name: "BaseChart",
  props: {
    xAxiscategory: {
      type: Array,
      required: true
    },
    seriesdata: {
      type: Array,
      required: true
    }
  },
  computed: {
    setchartOptions() {
      return {
        lang: {
          noData: `都道府県を選択してください。`
        },
        chart: {
          type: "line"
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
          categories: this.xAxiscategory,
          min: 0.5
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "top"
        },
        series: this.seriesdata,
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
        }
      };
    }
  }
};
</script>
