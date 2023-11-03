<script setup lang="ts">
import { ref, watch } from 'vue'
import type { AdvancedSongDataInterface, SongDifficulty } from '@/utils/SongData.interface.ts'
import SongDetailsBar from './SongDetailsBar.vue';

const props = defineProps(['updateSongs'])
const results = ref<AdvancedSongDataInterface[]>([]);

watch(() => props.updateSongs, () => {
    results.value = props.updateSongs
}) 

const getDifficultyJacket = (songDifficulties:SongDifficulty[]) => {
    return songDifficulties.length > 0 ? songDifficulties[songDifficulties.length-1].jacket : ''
}

function getDiffBackground(diff:string) : string {
    // Using class binding does not seem to register custom tailwind extensions on bg, so I am opting for this method for now
    switch(diff) {
        case "NOVICE":
            return "bg-[url('/novice_diff_label_bg.png')]"
        case "ADVANCED":
            return "bg-[url('/adv_diff_label_bg.png')]"
        case "EXHAUST":
            return "bg-[url('/exh_diff_label_bg.png')]"
        case "HEAVENLY":
            return "bg-[url('/hvn_diff_label_bg.png')]"
        case "INFINITE":
            return "bg-[url('/inf_diff_label_bg.png')]"
        case "GRAVITY":
            return "bg-[url('/grv_diff_label_bg.png')]"
        case "VIVID":
            return "bg-[url('/vvd_diff_label_bg.png')]"
        case "MAXIMUM":
            return "bg-[url('max_diff_label_bg.png')]"
        case "EXCEED":
            return "bg-[url('xcd_diff_label_bg.png')]"
        default:
            throw new Error("Returned invalid difficulty of " + diff)
    }
}
</script>

<template>
    <div class="text-white">
        <div v-if="results" class="flex flex-col items-center justify-center">
            <div class="min-w-fit w-4/6 rounded-2xl mx-5 my-3 shadow-sky-200 shadow-sm overflow-hidden" v-for="result in results" :key="result.title">
                <div id="search_result_cell" @click="result.expanded = !result.expanded">
                    <div id="result_cell" class="p-6 flex relative overflow-hidden min-w-fit bg-mainNight select-none hover:cursor-pointer hover:brightness-125">
                        <div class="min-h-full min-w-fit flex items-center pointer-events-none">
                            <img class="w-32 h-32 z-50" :src="'/' + getDifficultyJacket(result.song_difficulties)" >
                        </div>

                        <div class="ml-5 z-10">
                            <div class="@container w-160 font-thin font-sans max-md:w-72">
                                <div class="text-4xl max-md:text-3xl">{{ result.title }}</div>
                            </div>
                            <div class="w-fit flex max-md:w-64 max-md:flex-wrap mt-10 max-w-lg justify-between">
                                <div class="m-2 bg-center bg-no-repeat text-center min-w-fit" :class=getDiffBackground(difficulty.difficulty_name) v-for="difficulty in result.song_difficulties" :key="difficulty.difficulty_name">
                                    <p class="mx-2 font-semibold">{{difficulty.difficulty_name}} {{difficulty.difficulty_level}} </p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="absolute -top-2 -right-28 z-0 overflow-hidden visible max-lg:hidden">
                            <div class="absolute z-10 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-transparent via-70% via-mainNight to-80% to-mainNight"></div>
                            <img class="w-160 h-96 brightness-75" :src="'/' + getDifficultyJacket(result.song_difficulties)" >
                        </div>
                    </div>
                </div>
                <SongDetailsBar v-if="result.expanded" :song_info="result"/>
            </div>
        </div>
    </div>
</template>