<template>
  <div class="counter-wrap">
    <div class="counter">
      <div class="counter__progress" :style="progressBarStyle" />
      <div class="counter-description">
        <p class="counter-description__text">Added items</p>
        <p class="counter-description__count">{{ progress }}/{{ max }}</p>
      </div>
    </div>

    <p class="counter-divider">or</p>

    <CountdownTimer :time="maxTime" />
  </div>
</template>

<script>
import CountdownTimer from './CountdownTimer';

export default {
  components: { CountdownTimer },
  props: ["progress", "max", "maxTime"],
  computed: {
    percent() {
      return this.max * (this.progress / 100);
    },
    progressBarStyle() {
      return {
        width: this.percent + "%",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "resources/assets/sass/_variables";

@keyframes anim {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 50px 50px;
  }
}

.counter-wrap {
  display: flex;
  align-items: center;
}

.counter-divider {
  margin: 10px 20px;
  font-size: 30px;
  color: $mainBlue;
}

.counter {
  background-color: $mainBlue;
  min-height: 76px;
  width: 100%;
  display: flex;
  color: #fff;
  position: relative;

  &__progress {
    background-size: 20px 20px;
    background-image: linear-gradient(
      -45deg,
      #33c9ff 25%,
      #00b2f2 25%,
      #00b2f2 50%,
      #33c9ff 50%,
      #33c9ff 75%,
      #00b2f2 75%
    );
    animation: anim 3s linear infinite;
    align-self: stretch;
  }
}

.counter-description {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  &__text {
    font-size: 13px;
  }

  &__count {
    font-size: 34px;
  }
}
</style>
