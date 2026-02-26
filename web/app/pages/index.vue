<template>
    <div class="w-full mt-24 bg-gradient-to-b from-gray-100 via-teal-50 to-gray-100">
        <div class="py-24">
            <div class="flex justify-center flex-wrap">
                <AnimatedText
                    text="Arrêtez de deviner quoi développer"
                    :speed="0.1"
                    :delay="0"
                    class="text-5xl font-bold text-center"
                />

                <AnimatedText
                    text="Construisez ce que vos clients demandent"
                    :speed="0.1"
                    :delay="0.6"
                    class="text-5xl font-bold text-teal-400 text-center"
                />
            </div>
        </div>

        <div class="py-12">
            <AOSBlock type="fade-up" :duration="750" :delay="750" class="text-center">
                <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                    SimpleFB centralise les feedbacks, organise les votes et vous aide à prioriser
                    les fonctionnalités qui auront le plus d’impact.
                </p>
            </AOSBlock>
    
            <AOSBlock type="fade-up" :duration="750" :delay="1000" class="flex justify-center gap-4 mt-5">
                <NuxtLink :to="`/register`" class="border border-teal-400 hover:bg-teal-300 bg-teal-100 hover:shadow p-2 rounded-xl transition">Commencer gratuitement</NuxtLink>
                
                <NuxtLink :to="`/`" class="border border-teal-400 hover:bg-teal-300 bg-teal-100 hover:shadow p-2 rounded-xl transition">Voir une demo</NuxtLink>
            </AOSBlock>
        </div>

        <AOSBlock type="fade-up" :duration="750" :delay="1250" class="mt-10">
            <FeedbackCaroussel :feedbacks="feedbacks" :auto-scroll="true" :interval="4000" direction="left"/>
        </AOSBlock>

        <AOSBlock type="fade-left" :duration="1250" :delay="1500" class="py-24 px-4 text-center">
            <section class="py-24 text-center px-4">
                <h2 class="text-4xl font-bold mb-6">
                    Le feedback est partout… sauf là où il devrait être
                </h2>

                <div class="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 text-left mt-10">
                    <ul class="space-y-4 text-gray-600">
                        <li>❌ Emails impossibles à suivre</li>
                        <li>❌ Messages Slack oubliés</li>
                        <li>❌ Idées dupliquées</li>
                        <li>❌ Impossible de prioriser objectivement</li>
                    </ul>

                    <div class="text-gray-700 text-lg">
                        Résultat : vous perdez du temps et développez des fonctionnalités
                        qui n’apportent pas de valeur.
                    </div>
                </div>
            </section>
        </AOSBlock>

        <AOSBlock type="fade-right" :duration="1250" :delay="0" class="py-24 px-4 text-center">
            <section class="py-24 px-4 text-center">
                <h2 class="text-4xl font-bold mb-12">
                    Comment ça marche ?
                </h2>

                <div class="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
                    <div>
                        <div class="text-3xl mb-4">1️⃣</div>
                        <h3 class="font-bold mb-2">Créez votre projet</h3>
                        <p class="text-gray-600">
                            Générez un lien public personnalisé.
                        </p>
                    </div>

                    <div>
                        <div class="text-3xl mb-4">2️⃣</div>
                        <h3 class="font-bold mb-2">Collectez les feedbacks</h3>
                        <p class="text-gray-600">
                            Vos utilisateurs proposent et votent.
                        </p>
                    </div>

                    <div>
                        <div class="text-3xl mb-4">3️⃣</div>
                        <h3 class="font-bold mb-2">Priorisez intelligemment</h3>
                        <p class="text-gray-600">
                            Décidez en fonction des votes et tendances.
                        </p>
                    </div>
                </div>
            </section>
        </AOSBlock>

        <AOSBlock type="fade-up" :duration="1250" :delay="0" class="py-24 px-4 text-center">
            <section class="py-24 px-4 text-center">
                <h2 class="text-4xl font-bold mb-6">
                    Montrez que vous avancez
                </h2>

                <p class="text-gray-600 max-w-2xl mx-auto mb-10">
                    Publiez votre roadmap publique : Planned, In Progress, Done.
                    Renforcez la confiance et la transparence.
                </p>

                <NuxtLink to="/register"
                    class="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-xl shadow transition">
                    Créer ma roadmap
                </NuxtLink>
            </section>
        </AOSBlock>

        <AOSBlock type="fade-up" :duration="1250" :delay="0" class="py-24 px-4 text-center">
            <section class="py-24 px-4 text-center">
                <h2 class="text-4xl font-bold mb-12">
                    Des plans simples et transparents
                </h2>

                <div class="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                    
                    <!-- FREE -->
                    <div class="bg-white p-8 rounded-2xl shadow">
                        <h3 class="text-xl font-bold mb-4">Gratuit</h3>
                        <p class="text-3xl font-bold mb-6">0€</p>
                        <ul class="text-gray-600 space-y-2">
                            <li>1 projet</li>
                            <li>100 feedback max</li>
                            <li>Votes</li>
                            <li>Badge SimpleFB</li>
                        </ul>
                    </div>

                    <!-- STARTER -->
                    <div class="bg-teal-500 text-white p-8 rounded-2xl shadow-lg scale-105">
                        <h3 class="text-xl font-bold mb-4">Starter</h3>
                        <p class="text-3xl font-bold mb-6">4,99€/mois</p>
                        <ul class="space-y-2">
                            <li>3 projets</li>
                            <li>Feedback illimité</li>
                            <li>Roadmap publique</li>
                            <li>Sans badge</li>
                        </ul>
                    </div>

                    <!-- PRO -->
                    <div class="bg-white p-8 rounded-2xl shadow">
                        <h3 class="text-xl font-bold mb-4">Pro</h3>
                        <p class="text-3xl font-bold mb-6">9,99€/mois</p>
                        <ul class="text-gray-600 space-y-2">
                            <li>Projets illimités</li>
                            <li>Widget intégré</li>
                            <li>Analytics</li>
                            <li>Rôles & OAuth</li>
                        </ul>
                    </div>

                </div>
            </section>
        </AOSBlock>

        <AOSBlock type="fade-up" :duration="1250" :delay="0" class="py-24 px-4 text-center">
            <section class="py-24 px-4 text-center">
                <h2 class="text-4xl font-bold mb-12">
                    Questions fréquentes
                </h2>

                <div class="max-w-3xl mx-auto text-left space-y-6">
                    <div>
                        <h3 class="font-bold">Est-ce vraiment gratuit ?</h3>
                        <p class="text-gray-600">Oui, 1 projet gratuit à vie.</p>
                    </div>

                    <div>
                        <h3 class="font-bold">Puis-je exporter mes données ?</h3>
                        <p class="text-gray-600">Oui, export CSV disponible dans les plans payants.</p>
                    </div>

                    <div>
                        <h3 class="font-bold">Puis-je annuler à tout moment ?</h3>
                        <p class="text-gray-600">Oui, sans engagement.</p>
                    </div>
                </div>
            </section>
        </AOSBlock>

        <section class="py-24 bg-teal-500 text-white text-center px-4">
            <h2 class="text-4xl font-bold mb-10">
                Construisez enfin ce que vos clients veulent vraiment
            </h2>

            <NuxtLink to="/register"
                class="bg-white text-teal-600 px-8 py-4 rounded-xl shadow-lg font-bold hover:scale-105 transition">
                Essayer gratuitement
            </NuxtLink>
        </section>
    </div>
</template>

<script setup lang="ts">
import AnimatedText from '~/components/AnimatedText.vue';
import AOSBlock from '~/components/AOSBlock.vue';
import FeedbackCaroussel from '~/components/FeedbackCaroussel.vue';

const feedbacks = [
    { title: 'Super idée', content: 'J’adore cette fonctionnalité !', user: { firstname: 'Alice', lastname: 'D.' }, tag: { name: 'Feature', color: '#34D399' } },
    { title: 'Bug', content: 'Il y a un problème sur la page.', user: { firstname: 'Bob', lastname: 'L.' }, tag: { name: 'Bug', color: '#F87171' } },
    { title: 'Amélioration', content: 'Peut-être ajouter ceci.', user: { firstname: 'Claire', lastname: 'M.' }, tag: { name: 'Suggestion', color: '#60A5FA' } },
    { title: 'Interface claire', content: 'L’interface est intuitive et facile à prendre en main.', user: { firstname: 'Lucas', lastname: 'R.' }, tag: { name: 'UX', color: '#A78BFA' } },
    { title: 'Votes très utiles', content: 'Le système de vote aide vraiment à prioriser les idées.', user: { firstname: 'Emma', lastname: 'T.' }, tag: { name: 'Vote', color: '#22D3EE' } },
    { title: 'Export manquant', content: 'Il serait utile d’exporter les feedbacks en CSV.', user: { firstname: 'Nathan', lastname: 'G.' }, tag: { name: 'Feature', color: '#34D399' } },
    { title: 'Notification', content: 'Recevoir une notification quand une idée dépasse 50 votes serait top.', user: { firstname: 'Sofia', lastname: 'K.' }, tag: { name: 'Suggestion', color: '#60A5FA' } },
    { title: 'Dark mode', content: 'Un mode sombre améliorerait le confort visuel.', user: { firstname: 'Hugo', lastname: 'B.' }, tag: { name: 'Feature', color: '#34D399' } },
    { title: 'Performance', content: 'Le chargement des projets est très rapide, bravo !', user: { firstname: 'Léa', lastname: 'C.' }, tag: { name: 'Performance', color: '#FBBF24' } },
    { title: 'Tri avancé', content: 'Pouvoir filtrer par nombre de votes serait un vrai plus.', user: { firstname: 'Tom', lastname: 'N.' }, tag: { name: 'Improvement', color: '#818CF8' } }
];

definePageMeta({
    layout: 'landing'
})

useHead(() => ({
    title: 'SimpleFB'
}))
</script>