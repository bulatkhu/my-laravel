<template>
  <div class="partInfo">
    <div class="partInfo-top">
      <div class="partInfo-top__content">
        <div class="partInfo-top__col">
          <div class="partInfo-top__avatar">
            <img src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg" alt="user" />
          </div>

          <p class="partInfo-top__name">Lorem ipsum dolor sit amet.</p>
        </div>
        <div class="partInfo-top__col">
          <p class="partInfo-top__sum partInfo-sum">
            <span class="partInfo-sum__value">3.01 rub</span>
            <span class="partInfo-sum__ticket">Tickets #1231231</span>
          </p>
        </div>
      </div>
    </div>

    <div class="partInfo-bottom">
      <SkinItem />
      <SkinItem />
      <SkinItem />
      <SkinItem />
      <SkinItem />
      <SkinItem />
      <SkinItem />
      <SkinItem />
      <SkinItem />
      <SkinItem />
      <SkinItem />
      <SkinItem />
      <SkinItem />
    </div>
  </div>
</template>

<script>
import SkinItem from './SkinItem'
export default {
  name: "ParticipantInfo",
  components: { SkinItem },
};
</script>

<style scoped lang="scss">
@import "resources/assets/sass/_variables";

.partInfo {
  padding: 0 12px;

  &:nth-child(even) {
    background-color: $lighterWhite;
  }
}

.partInfo-sum {
  display: flex;
  flex-direction: column;

  &__value {
    font-size: 28px;
    color: $deepBlack;
    margin-bottom: 8px;
  }

  &__ticket {
    font-size: 13px;
    color: $mainGray;
  }
}

.partInfo-top {
  padding: 10px 0;
  color: $mainBlack;

  border-bottom: 1px solid $mainGray;

  &__content {
    max-width: 90%;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__name {
    font-size: 22px;
  }

  &__col {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__avatar {
    width: 55px;
    height: 55px;
    margin-right: 10px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.partInfo-bottom {
  padding: 10px 0 20px 0;
  display: flex;
  flex-wrap: wrap;

  margin-left: -5px;
}
</style>
