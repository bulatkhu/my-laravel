<template>
  <div class="actions">
    <div class="actions-col">
      <p class="actions__label">Bank:</p>
      <p class="actions__bank">100$</p>
    </div>

    <div class="actions-divider" />

    <div class="actions-col">
      <button class="actions-btn" :click="onSelectItems"
        >Select items in roulette!</button
      >
      <!--      <Button class="actions-col__btn">Select items in roulette!</Button>-->
    </div>
    <div class="actions-col">
      <p class="actions-col__description">
        The minimum price per skin 10.98 RUR.
      </p>
      <p class="actions-col__description">
        The maximum amount of skins 14636 RUR.
      </p>
      <p class="actions-col__description">No more 10 items per bet.</p>
    </div>
  </div>
</template>

<script>

export default {
  methods: {
    onSelectItems: () => console.log("on select items"),
  },
};
</script>

<style scoped lang="scss">
@import "resources/assets/sass/_variables";

.actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 21px;

  &__label {
    margin-bottom: 8px;
  }

  &__bank {
    color: $mainRed;
    font-size: 27px;
  }

  &-col {
    color: $mainBlack;
  }
}

.actions-divider {
  height: 100%;
  min-height: 40px;
  width: 1px;
  align-self: center;
  background-color: $mainGray;
}

.actions-col {
  &__description {
    font-size: 14px;

    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }

  &__btn {
    padding: 10px 15px;
    background-color: $mainBlue;
  }
}
</style>
