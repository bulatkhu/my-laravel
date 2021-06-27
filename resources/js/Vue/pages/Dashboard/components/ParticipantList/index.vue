<template>
  <div class="participant">
    <Participant :percent="20" />
    <Participant :percent="20" />
    <Participant :percent="20" />
    <Participant :percent="20" />
    <Participant :percent="20" />
    <Participant vip :percent="20" />
  </div>
</template>

<script>
import Participant from './Participant'
export default {
  components: { Participant },
};
</script>

<style scoped lang="scss">
@import "resources/assets/sass/_variables";

.participant {
  padding: 10px 20px;
  background-color: $mainGray;
  min-height: 100px;
  margin: 0 -12px;

  display: flex;
  justify-content: center;
}
</style>
