<template>
  <div class="classic">
    <Top
      :items="state.items"
      :max-items="state.maxItems"
      :time="state.timeLeft"
    />
    <Actions />
    <ParticipantList />
    <ParticipantItems />
    <BattleStartBlock />
  </div>
</template>

<script>
import Top from "./Top";
import Actions from "./Actions";
import ParticipantList from "../components/ParticipantList";
import ParticipantItems from "../components/ParticipantItems";
import BattleStartBlock from "../components/BattleStartBlock";

import store from '../../../../store'

export default {
  components: {
    Actions,
    Top,
    ParticipantList,
    ParticipantItems,
    BattleStartBlock,
  },
  name: "classic",
  computed: {
    state() {
      return store.state.classic;
    },
  },
  mounted() {
    console.log("state", store.state.classic);
  },
};
</script>

<style lang="scss" scoped>
@import "resources/assets/sass/_variables";

.classic {
  background-color: #fff;
  padding: 12px;
}
</style>
