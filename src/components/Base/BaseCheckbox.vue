<template>
  <div class="BaseCheckbox">
    <input
      type="checkbox"
      :value="object"
      :id="id"
      v-model="checkeditem"
      clsss="BaseCheckbox__Checkbox"
    />
    <label :for="id" class="BaseCheckbox__Label">
      <span class="BaseCheckbox__Text"> <slot></slot></span>
    </label>
  </div>
</template>

<script>
export default {
  name: "BaseCheckbox",
  props: {
    object: {
      type: Object,
      required: true
    },
    id: {
      type: Number,
      required: true
    },
    value: {
      type: Array,
      required: true
    }
  },
  computed: {
    checkeditem: {
      get() {
        return this.value;
      },
      set(value) {
        return this.$emit("input", value);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.BaseCheckbox {
  &__Label {
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
  }

  &__Text {
    display: inline-block;
    width: 70px;
  }
}

input[type="checkbox"]:checked {
  & + .BaseCheckbox__Label {
    font-size: 17px;
    font-weight: bold;
  }
  & + .BaseCheckbox__Label:before {
    background-color: MediumSeaGreen;
    border-color: MediumSeaGreen;
    color: #fff;
  }
}
</style>
