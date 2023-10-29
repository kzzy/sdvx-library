<script setup lang="ts">
import { diffTextColorLookupTable } from '@/helpers/LookupTables'
const props = defineProps(['title', 'arcadeUnlockMethod','konasuteUnlockMethod', 'konasuteVolPack', 'songDiffs'])
console.log(props)

</script>

<template>
    <div class="w-[798px] max-md:w-[422px]">
        <div class="m-4 flex flex-col text-3xl">
            <div class="border-b-[1px] pb-2 border-white/30">
                <div class="px-6 pb-8">
                    <h2 class="text-4xl my-5 font-semibold text-blue-700">ARCADE</h2>
                    <p v-if="props.arcadeUnlockMethod == 'PCB'" class="font-thin text-xl">{{ props.title }} is unlockable on Arcade Cabinets using PCB<br></p>
                    <p v-if="props.arcadeUnlockMethod == 'BLASTERGATE'" class="font-thin text-xl">{{ props.title }} is unlockable on Arcade Cabinets through the Blaster Gate<br></p>
                    <p v-if="props.arcadeUnlockMethod == 'HEXADIVER'" class="font-thin text-xl">{{ props.title }} is unlockable on Arcade Cabinets through the Hexa Diver<br></p>
                    <p v-if="props.arcadeUnlockMethod == 'OMEGADIMENSION'" class="font-thin text-xl">{{ props.title }} is unlockable on Arcade Cabinets through the Omega Dimension<br></p>
                    <span class="text-sm text-gray-400">* If the cabinet is using a custom network, this may not apply</span>
                </div>
            </div>
            <div class="border-b-[1px] pb-2 border-white/30">
                <div class="px-6 pb-8">
                    <h2 class="text-4xl my-5 font-semibold text-blue-700">KONASUTE</h2>
                    <div class="font-thin text-xl">
                        <p v-if="props.konasuteUnlockMethod == 'VOLUMEPACK'" >{{ props.title }} is unlockable on Konasute by purchasing Volume Pack No. {{ props.konasuteVolPack }}</p>
                        <p v-if="props.konasuteUnlockMethod == 'BLASTERGATE_DEFAULT'" >{{ props.title }} is unlockable on Konasute through the Blaster Gate</p>
                        <p v-if="props.konasuteUnlockMethod == 'BLASTERGATE_EVENT'" >{{ props.title }} is unlockable on Konasute through the Blaster Gate during an Event period</p>
                    </div>
                    <div v-if="props.konasuteUnlockMethod == 'VOLUMEPACK'" class="my-3 font-thin text-xl">
                        <div class="inline-flex" v-for="diff in props.songDiffs" :key="diff">
                            <span v-if="diff.isKonasute == true" class="font-medium" :class="diffTextColorLookupTable[diff.difficulty_name]">{{ diff.difficulty_name }}&nbsp;</span>
                        </div>
                        <span class="font-thin text-xl">Difficulties are available on the Volume Pack</span>
                        <div class="inline-flex mt-2" v-for="diff in props.songDiffs" :key="diff">
                            <span v-if="diff.isKonasute == false" class="font-medium" :class="diffTextColorLookupTable[diff.difficulty_name]">{{ diff.difficulty_name }}
                                <span class="font-thin text-xl">Difficulty is not available on Konasute</span>
                            </span>
                        </div>
                    </div>
                    <span class="text-sm text-gray-400">* EXCEED chart difficulties are currently not available on Konasute</span>
                </div>
            </div>
            <div>
                <div class="px-6 pb-8">
                    <h2 class="text-4xl my-5 font-semibold text-blue-700">CLONES (K-SHOOT MANIA / USC)</h2>
                    <p class="font-thin text-xl">
                        Songs are generally available on Oniichan. If they are not, wait until they are released.<br>
                        <span class="text-sm text-gray-400">* Some charts for newer songs can be found on the SDVX Community discord when someone converts them</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>