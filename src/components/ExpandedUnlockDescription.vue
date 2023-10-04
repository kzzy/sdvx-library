<script setup lang="ts">
const props = defineProps(['title', 'konasuteUnlockMethod', 'konasuteVolPack', 'songDiffs'])
</script>

<template>
    <div class="rounded-xl border-indigo-900 border-4 bg-gray-900 bg-opacity-80">
        <div class="m-4 flex flex-col items-center text-3xl">
            <h2 class="text-4xl my-5 font-semibold">ARCADE</h2>
            <p class="font-thin text-xl">
                {{ props.title }} is unlockable on Arcade Cabinets using PCB<br>
                <span class="text-base">If you're playing through a custom network such as Project Flower, this may not apply</span>
            </p>
            <h2 class="text-4xl my-5 font-semibold">KONASUTE</h2>
            <div class="font-thin text-xl">
                <p v-if="props.konasuteUnlockMethod == 'VolumePack'" >{{ props.title }} is unlockable on Konasute by purchasing the {{ props.konasuteUnlockMethod }}</p>
                <p v-if="props.konasuteUnlockMethod == 'BlasterGate'" >{{ props.title }} is unlockable on Konasute through the Blaster Gate</p>
            </div>
            <div v-if="props.konasuteUnlockMethod == 'VolumePack'" class="my-3 font-thin text-xl">
                <div>
                    <div class="inline" v-for="diff in props.songDiffs.song_difficulties" :key="diff">
                    <span v-if="diff.isKonasute == true">{{ diff.difficulty_name }}&nbsp;</span>
                    </div>
                    <span class="font-thin text-xl">Difficulties are available on Volume Pack {{ props.konasuteVolPack }}</span>
                </div>
                <div>
                    <div class="inline mt-2" v-for="diff in props.songDiffs.song_difficulties" :key="diff">
                    <span v-if="diff.isKonasute == false">{{ diff.difficulty_name }}
                        <span class="font-thin text-xl">Difficulty is not available on Konasute</span>
                    </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>