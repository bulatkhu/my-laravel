<template>
  <div :class="['partItem', vip && 'partItem-vip']">
    <img
      class="partItem__img"
      :src="img || 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg'"
      alt="participant"
    />

    <p class="partItem__percent">{{ percent }}%</p>
  </div>
</template>

<script>
export default {
  props: {
    vip: Boolean,
    percent: Number,
    img: String,
  },
};
</script>

<style scoped lang="scss">
@import "resources/assets/sass/_variables";

.partItem-vip {
  border: 2px solid yellow;
}

.partItem {
  width: 80px;
  height: 80px;
  background-color: $secondaryBlue;
  position: relative;

  &__percent {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    text-align: center;
    font-weight: 600;

    color: #fff;
    padding: 3px;

    position: absolute;
    bottom: 0;
  }

  &__img {
    min-width: 100%;
    height: 100%;
  }

  &:not(:last-child) {
    margin-right: 5px;
  }
}
</style>
