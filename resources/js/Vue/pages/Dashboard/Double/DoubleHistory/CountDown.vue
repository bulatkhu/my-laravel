<template>
    <span>{{ timerCount }}</span>
</template>

<script>

export default {
    data() {
        return {
            timerEnabled: true,
            timerCount: 8000 / 1000,
        }
    },
    watch: {
        timerEnabled(value) {
            if (value) {
                setTimeout(() => {
                    this.timerCount--;
                }, 1000);
            }
        },
        timerCount: {
            handler(value) {
                if (value > 0 && this.timerEnabled) {
                    setTimeout(() => {
                        this.timerCount--;
                    }, 1000);
                }
            },
            immediate: true // This ensures the watcher is triggered upon creation
        }
    },
    methods: {
        play() {
            this.timerEnabled = true;
        },
        pause() {
            this.timerEnabled = false;
        }
    }
}
</script>
