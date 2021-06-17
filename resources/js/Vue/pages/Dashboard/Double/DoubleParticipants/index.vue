<template>
    <div class="double-part">
        <div class="double-part__col">
            <ColumnHeader amount="23" players="71" type="blue" />
            <ParticipateButton type="blue" />
            <ul class="double-part__list"></ul>
        </div>
        <div class="double-part__col">
            <ColumnHeader amount="251" players="31" type="gold" />
            <ParticipateButton type="gold" />
            <ul class="double-part__list">
                <PariticipantItem />
                <PariticipantItem />
                <PariticipantItem />
                <PariticipantItem />
                <PariticipantItem />
            </ul>
        </div>
        <div class="double-part__col">
            <ColumnHeader amount="231" players="10" type="green" />
            <ParticipateButton type="green" />
            <ul class="double-part__list"></ul>
        </div>
    </div>
</template>

<script>
import ColumnHeader from './ColumnHeader'
import ParticipateButton from './ParticipateButton'
import PariticipantItem from './PariticipantItem'
export default {
    components: {PariticipantItem, ParticipateButton, ColumnHeader}
}
</script>

<style scoped lang="scss">

.double-part {
    display: flex;
    justify-content: space-between;

    &__list {
        margin-top: 30px;
    }

    &__col {
        flex-basis: calc(33.33% - 10px);
    }
}

</style>
