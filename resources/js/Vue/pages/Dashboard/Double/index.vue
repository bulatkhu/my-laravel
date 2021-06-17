<template>
    <div class="double">
        <div class="double-head">

            <DoubleSlider />

            <DoubleHistory />
        </div>

        <div class="double-history">

        </div>
    </div>
</template>

<script>
import DoubleSlider from './DoubleSlider';
import DoubleHistory from './DoubleHistory';

export default {
    components: {DoubleSlider, DoubleHistory}
}
</script>

<style lang="scss" scoped>
@import "resources/assets/sass/_variables";

.double {}

.double-head {
    background-color: $secondary-blue;
    padding: 20px 20px 10px;
    position: relative;
    border-radius: 10px;

    margin-bottom: 20px;
}

</style>
