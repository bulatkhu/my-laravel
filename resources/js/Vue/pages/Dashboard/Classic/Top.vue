<template>
  <div class="head-root">
    <div class="head">
      <p>The round begins #3724654</p>
      <div class="head__features">
        <p style="margin-right: 20px">Fair play</p>
        <p>Auto bet</p>
      </div>
    </div>
    <DropCounter :progress="items" :max="maxItems" :maxTime="time" />
  </div>
</template>

<script>
import DropCounter from "../components/DropCounter";

export default {
  props: {
    items: Number,
    maxItems: Number,
    time: Number,
  },
  components: { DropCounter },
};
</script>

<style lang="scss" scoped>
@import "resources/assets/sass/_variables";

.head-root {
  margin-bottom: 20px;
}
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  color: $mainBlack;

  &__features {
    display: flex;
  }
}
</style>
