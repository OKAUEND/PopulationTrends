<template>
  <article class="Prefectures">
    都道府県
    <div class="Prefectures__Container">
      <ul class="Prefectures__PrefectureList">
        <li
          v-for="(prefecture, prefCode) in prefectures"
          :key="prefCode"
          class="Prefectures__Prefecture"
        >
          <input
            type="checkbox"
            :value="prefecture"
            :id="prefCode"
            v-model="checkprefectures"
            @change="checkemit"
            clsss="CustomCheckbox"
          />
          <label :for="prefCode" class="CustomLabel">
            <span class="CustomLabel__text"> {{ prefecture.prefName }}</span>
          </label>
        </li>
      </ul>
    </div>
  </article>
</template>

<script>
export default {
  name: "PrefectureList",
  data() {
    return {
      prefectures: [],
      checkprefectures: []
    };
  },
  async mounted() {
    this.prefectures = await this.axios
      .get("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
        headers: { "X-API-KEY": process.env.VUE_APP_apikey }
      })
      .then(prefectures => {
        return prefectures.data.result;
      })
      .catch(error => {
        //レスポンスエラーなら別画面へ遷移して500エラーにするかも
        console.error({ error });
        alert({ error });
      });
  },
  methods: {
    checkemit() {
      return this.$emit("change", this.checkprefectures);
    }
  }
};
</script>

<style scoped lang="scss">
.Prefectures {
  width: 330px;
  margin: 0 auto;
  margin-bottom: 10px;
  @media screen and (min-width: 761px) {
    width: calc(100% / 1.5);
  }
  &__Container {
    margin: 0 auto;
  }
  &__PrefectureList {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  &__Prefecture {
    width: 110px;
    margin-top: 3px;
    margin-bottom: 3px;
  }
}

.CustomCheckbox {
  display: none;
  position: absolute;
}

.CustomLabel {
  outline: 0;
  display: none;
  display: block;

  &:hover {
    font-size: 17px;
    font-weight: bold;
  }

  &:before {
    content: "\2714";
    border: 2px solid #000;
    border-radius: 2px;
    display: inline-block;
    width: 18px;
    height: 20px;
    padding-left: 2px;
    padding-bottom: 2px;
    margin-right: 2px;
    vertical-align: bottom;
    color: transparent;
    transition: 0.2s;
  }

  &:active:before {
    transform: scale(0);
  }

  &__text {
    display: inline-block;
    width: 70px;
  }
}

input[type="checkbox"]:checked {
  & + .CustomLabel {
    font-size: 17px;
    font-weight: bold;
  }
  & + .CustomLabel:before {
    background-color: MediumSeaGreen;
    border-color: MediumSeaGreen;
    color: #fff;
  }
}
</style>
