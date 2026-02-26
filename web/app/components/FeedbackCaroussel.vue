<template>
  <div class="relative w-full overflow-hidden py-6 min-h-[200px]">

    <!-- Fade gauche -->
    <div class="pointer-events-none absolute left-0 top-0 h-full w-24 
                bg-gradient-to-r from-white to-transparent z-10" />

    <!-- Fade droite -->
    <div class="pointer-events-none absolute right-0 top-0 h-full w-24 
                bg-gradient-to-l from-white to-transparent z-10" />

    <!-- Track -->
    <div class="absolute flex gap-6 animate-scroll w-max">
      <div
        v-for="(feedback, i) in doubledFeedbacks"
        :key="i"
        class="min-w-[320px] bg-white rounded-2xl shadow-md p-6 flex flex-col transition hover:scale-105 duration-300"
      >
        <div class="flex justify-between items-center mb-3">
          <span class="font-semibold text-gray-800">
            {{ feedback.user.firstname }} {{ feedback.user.lastname }}
          </span>

          <span
            class="text-xs font-semibold px-3 py-1 rounded-full"
            :style="{
              backgroundColor: feedback.tag.color + '20',
              color: feedback.tag.color
            }"
          >
            {{ feedback.tag.name }}
          </span>
        </div>

        <p class="text-gray-600 text-sm">
          {{ feedback.content }}
        </p>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Feedback {
  content: string
  user: { firstname: string; lastname: string }
  tag: { name: string; color: string }
}

const props = defineProps<{
  feedbacks: Feedback[]
}>()

// Duplication pour loop infinie fluide
const doubledFeedbacks = computed(() => [
  ...props.feedbacks,
  ...props.feedbacks
])
</script>

<style scoped>
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll {
  animation: scroll 100s linear infinite;
}


</style>