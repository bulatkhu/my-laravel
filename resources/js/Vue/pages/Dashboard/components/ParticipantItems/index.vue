<template>
  <div class="participantItems">
    <ParticipantInfo />
    <ParticipantInfo />
    <ParticipantInfo />
    <ParticipantInfo />
    <ParticipantInfo />
    <ParticipantInfo />
    <ParticipantInfo />
    <ParticipantInfo />
    <ParticipantInfo />
    <ParticipantInfo />
    <ParticipantInfo />
    <ParticipantInfo />
    <ParticipantInfo />
  </div>
</template>

<script>
import ParticipantInfo from "./ParticipantInfo";
export default {
  components: { ParticipantInfo },
};
</script>

<style lang="scss" scoped>
@import "resources/assets/sass/_variables";

.participantItems {
  margin: 0 -12px;
  background-color: $lightWhite;
}
</style>
