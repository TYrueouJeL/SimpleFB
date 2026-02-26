<template>
    <div class="flex bg-gray-50 h-screen">
        <Navbar />

        <div class="flex-1 flex flex-col">
        <header class="flex justify-end p-4">
            <UserMenu />
        </header>

        <main class="flex-1 ml-64 p-8">
            <slot />
        </main>
        </div>
    </div>
</template>