<template>
    <div class="double">
        <div class="double-head">

            <DoubleSlider />

        </div>
    </div>
</template>

<script>
import DoubleSlider from './DoubleSlider';

export default {
    components: {DoubleSlider}
}
</script>

<style lang="scss" scoped>
@import "resources/assets/sass/_variables";

.double {}

.double-head {
    background-color: $secondary-blue;
    padding: 20px 20px 10px;
    border-radius: 10px;
}

</style>
