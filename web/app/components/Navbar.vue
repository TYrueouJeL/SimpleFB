<template>
    <aside
    class="fixed top-0 left-0 h-screen w-64 border-r border-gray-400 transform transition-transform duration-300 z-50"
    >
    <div class="p-6 text-2xl font-bold border-b border-gray-400 text-center">
        <NuxtLink
        to="/"
        class="hover:text-sky-400 transtition duration-300"
        active-class="text-sky-400"
        >
            Projet 3
        </NuxtLink>
    </div>

    <nav class="flex flex-col gap-2 p-6">
        <NuxtLink
        to="/dashboard"
        class="px-4 py-2 rounded hover:bg-gray-200 transition duration-200"
        active-class="bg-gray-200 text-sky-400"
        >
            Dashboard
        </NuxtLink>

        <NuxtLink
        to="/project"
        class="px-4 py-2 rounded hover:bg-gray-200 transition duration-200"
        active-class="bg-gray-200 text-sky-400"
        >
            Projets
        </NuxtLink>
    </nav>
    </aside>
</template>