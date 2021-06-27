<template>
  <div class="skinItem">
    <img
        class="skinItem__img"
        src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg"
        alt="item"
    />

    <span class="skinItem__price">0.75 rub</span>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "resources/assets/sass/_variables";

.skinItem {
  position: relative;
  margin: 5px 5px;

  max-width: 112px;
  max-height: 112px;

  &__img {
      width: 100%;
      height: 100%;
  }

  &__price {
    position: absolute;
    bottom: 5px;
    right: 5px;
    font-size: 12px;
    color: $mainBlack;
  }
}
</style>
