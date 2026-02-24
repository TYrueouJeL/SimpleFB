<template>
    <div class="flex">
        <Navbar />

        <div class="flex-1 flex flex-col">
        <header class="flex justify-end p-4">
            <UserMenu />
        </header>

        <main class="p-6 flex-1 ml-64">
            <slot />
        </main>
        </div>
    </div>
</template>