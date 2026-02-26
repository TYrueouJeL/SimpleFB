<template>
    <div class="flex bg-gray-100 h-screen">
        <div class="flex-1 flex flex-col">
        <header class="flex justify-end p-4">
            <UserMenu />
        </header>

        <main class="flex-1">
            <slot />
        </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import UserMenu from '~/components/UserMenu.vue';

</script>