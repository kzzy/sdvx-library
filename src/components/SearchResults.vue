<script setup lang="ts">
import { ref, watch } from 'vue'
import type { AdvancedSongDataInterface, SongDifficulty } from '@/utils/SongData.interface.ts'
import SongDetailsBar from './SongDetailsBar.vue';
import { assetsJacketsDir, assetsBannersDir } from '@/helpers/LookupTables'

const props = defineProps(['updateSongs'])
const results = ref<AdvancedSongDataInterface[]>([]);

watch(() => props.updateSongs, () => {
    results.value = props.updateSongs
    console.log(results)
}) 

function getResultTitleStyling(title:string) {
    if(title.length <= 35) {
        return "text-4xl max-md:text-3xl"
    } else {
        return "text-2xl max-md:text-xl"
    }
}

function getDiffBackground(diff:string) : string {
  // Using class binding does not seem to register custom tailwind extensions on bg, so I am opting for this method for now
  switch(diff) {
      case "NOVICE":
          return "bg-[url('/src/assets/novice_diff_label_bg.png')]"
      case "ADVANCED":
          return "bg-[url('/src/assets/adv_diff_label_bg.png')]"
      case "EXHAUST":
          return "bg-[url('/src/assets/exh_diff_label_bg.png')]"
      case "HEAVENLY":
          return "bg-[url('/src/assets/hvn_diff_label_bg.png')]"
      case "INFINITE":
          return "bg-[url('/src/assets/inf_diff_label_bg.png')]"
      case "GRAVITY":
          return "bg-[url('/src/assets/grv_diff_label_bg.png')]"
      case "VIVID":
          return "bg-[url('/src/assets/vvd_diff_label_bg.png')]"
      case "MAXIMUM":
          return "bg-[url('/src/assets/max_diff_label_bg.png')]"
      case "EXCEED":
          return "bg-[url('/src/assets/xcd_diff_label_bg.png')]"
      default:
          throw new Error("Returned invalid difficulty of " + diff)
  }
}

const getDifficultyJacket = (songDifficulties:SongDifficulty[]) => {
    return songDifficulties.length > 0 ? songDifficulties[songDifficulties.length-1].jacket : ''
}
</script>

<template>
    <div v-if="results" class="flex flex-col items-center justify-center text-white">
        <div class="min-w-fit w-4/6 rounded-2xl mx-5 my-3  shadow-sky-200 shadow-sm overflow-hidden" v-for="result in results" :key="result.title">
            <div id="search_result_cell" class="group" @click="result.expanded = !result.expanded">
                <div id="result_cell" class="bg-mainNight group-hover:bg-[#060606] p-6 flex relative overflow-hidden min-w-fit select-none hover:cursor-pointer">
                    <div class="min-h-full min-w-fit flex items-center pointer-events-none">
                        <img class="w-32 h-32 z-50" :src="assetsJacketsDir + getDifficultyJacket(result.song_difficulties)" >
                    </div>
                    <div class="ml-5 z-10">
                        <div class="@container w-160 h-10 font-thin font-sans max-md:w-72 group-hover:brightness-125">
                            <h2 :class="getResultTitleStyling(result.title)">{{ result.title }}</h2>
                        </div>
                        <div class="w-fit flex max-md:w-[17rem] max-md:flex-wrap mt-10 max-w-lg justify-between">
                            <div class="m-2 bg-center bg-no-repeat text-center w-[116px]" :class=getDiffBackground(difficulty.difficulty_name) v-for="difficulty in result.song_difficulties" :key="difficulty.difficulty_name">
                                <p class="font-semibold">{{difficulty.difficulty_name}} {{difficulty.difficulty_level}} </p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="absolute top-0 -right-28 z-0 overflow-hidden visible max-md:hidden group-hover:brightness-125">
                        <div class="absolute z-10 w-full h-[400px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-transparent via-70% via-mainNight to-80% to-mainNight"></div>
                        <img class="w-[514px] h-[176px] brightness-75" :src="assetsBannersDir + result.banner_filename" >
                    </div>
                </div>
            </div>
            <SongDetailsBar v-if="result.expanded" :song_info="result"/>
        </div>
    </div>
</template>