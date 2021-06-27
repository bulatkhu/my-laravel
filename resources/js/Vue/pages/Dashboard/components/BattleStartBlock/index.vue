<template>
  <div class="battle-start-info">
    <h4 class="battle-start-info__title">BATTLE BEGINS! BET SKINS!</h4>
    <p class="battle-start-info__hash">
      HASH SHA256
      1befdeab00d99ca88ca27923a6d1e727b26b1e2c7c3808c2fd7079fceeb308e5
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "resources/assets/sass/_variables";

.battle-start-info {
  background-color: $secondaryBlue;
  padding: 24px;
  text-align: center;
  color: #fff;
  text-transform: uppercase;

  &__hash {
    font-size: 14px;
  }

  &__title {
    font-size: 40px;
    margin-bottom: 12px;
  }
}
</style>
