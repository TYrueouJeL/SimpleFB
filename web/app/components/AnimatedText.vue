<template>
    <p class="flex flex-wrap overflow-hidden">
        <span
            v-for="(word, index) in words"
            :key="index"
            class="inline-block transform translate-y-6 opacity-0 animate-fade-up"
            :style="{ animationDelay: `${delay + index * speed}s` }"
        >
            {{ word }}&nbsp;
        </span>
    </p>
</template>

<script setup lang="ts">
const props = defineProps<{
    text: string
    speed: number
    delay: number
}>()

const words = computed(() => props.text.split(' '))
</script>

<style scoped>
@keyframes fadeUp {
    0% {
        opacity: 0;
        transform: translateY(1.5rem);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-up {
    animation: fadeUp 0.5s forwards;
}
</style>