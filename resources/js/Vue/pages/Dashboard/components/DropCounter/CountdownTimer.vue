<template>
  <div class="timer">
    <div class="timer__column">
      <span class="timer__time">00</span>

      <span>minutes</span>
    </div>
    <div class="timer__column">
      <span class="timer__time">{{ time }}</span>

      <span>seconds</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    time: Number,
  },
};
</script>

<style lang="scss" scoped>
@import "resources/assets/sass/_variables";

.timer {
  display: flex;
  text-align: center;
  color: #fff;

  &__time {
    font-size: 40px;
    padding: 0 10px 5px 10px;
    background-color: $secondaryBlue;
    border-radius: 5px;
    margin-bottom: 5px;
  }

  &__column {
    padding: 5px;
    background-color: $mainBlue;
    min-width: 80px;
    display: flex;
    flex-direction: column;
    border-radius: 5px;

    &:not(:last-child) {
      margin-right: 3px;
    }
  }
}
</style>
