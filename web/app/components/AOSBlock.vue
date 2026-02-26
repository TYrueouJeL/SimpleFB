<template>
    <div
        class="w-full"
        :data-aos="type"
        :data-aos-duration="duration"
        :data-aos-delay="delay"
    >
        <slot />
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

const props = defineProps({
    type: {
        type: String,
        default: 'fade-up' // fade-up, fade-down, fade-left, fade-right...
    },
    duration: {
        type: Number,
        default: 800 // durée en ms
    },
    delay: {
        type: Number,
        default: 0 // délai en ms
    }
})

onMounted(() => {
    AOS.init({ once: true })
    AOS.refresh()
})
</script>