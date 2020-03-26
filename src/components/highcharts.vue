<template>
  <article></article>
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
      populations: []
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
