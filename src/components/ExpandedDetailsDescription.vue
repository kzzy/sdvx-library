<script setup lang="ts">
import HelpDescriptionPopup from './HelpDescriptionPopup.vue'
import { onMounted, reactive, computed, ref } from 'vue'
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler } from 'chart.js'
import { diffTextColorLookupTable, assetsDir, assetsJacketsDir } from '@/helpers/LookupTables'
import { Radar } from 'vue-chartjs'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
)

const props = defineProps(['song_info'])
const hover_arcade_desc_popup = ref(false)
const hover_konasute_desc_popup = ref(false)
const hover_tierlist_desc_popup = ref(false)
const difficulty_dropdown_menu = ref(false)
const currentDifficultyState = ref(props.song_info.song_difficulties[props.song_info.song_difficulties.length-1])

const radarData = reactive({
  labels: ['NOTES', 'PEAK', 'TSUMAMI ', 'TRICKY', 'HAND TRIP', 'ONE HAND'],
  datasets: [
    {
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      data: [currentDifficultyState.value.song_effect_radar_notes, currentDifficultyState.value.song_effect_radar_peak, currentDifficultyState.value.song_effect_radar_tsumami, currentDifficultyState.value.song_effect_radar_tricky, currentDifficultyState.value.song_effect_radar_handtrip, currentDifficultyState.value.song_effect_radar_onehanded]
    }
  ]
})

const radarComputed = computed(() => {
  return {
    labels: ['NOTES', 'PEAK', 'TSUMAMI ', 'TRICKY', 'HAND TRIP', 'ONE HAND'],
    datasets: radarData.datasets,
  }
})

const diffBGColorLookupTable: { [key:string]:string } = {
  "NOVICE": "bg-indigo-900",
  "ADVANCED": "bg-yellow-600",
  "EXHAUST": "bg-red-600",
  "HEAVENLY": "bg-cyan-700",
  "INFINITE": "bg-pink-700",
  "GRAVITY": "bg-orange-600",
  "VIVID": "bg-pink-600",
  "MAXIMUM": "bg-gray-600",
  "EXCEED": "bg-cyan-600"
}

const rankColorLookupTable: { [key:string]:string } = {
  "SS": "text-cyan-400",
  "S" : "text-red-900",
  "A+" : "text-red-300",
  "A": "text-red-300",
  "B+": "text-orange-400",
  "B": "text-orange-400",
  "C": "text-yellow-400",
  "D": "text-lime-400",
  "E": "text-green-400",
  "F": "text-gray-400",
  "F-": "text-gray-400",
  '': "text-gray-400"
}

// Used to validate potentially null data fields
const checkDataForEmpty = ((data:number|string|null):number|string|null => {
  return (data == null || data.length == 0) ? '-': data
})

const getKonasuteResultIcon = ((isKonasute:boolean):string => {
  return isKonasute ? 'checkmark.png' : 'xmark.png'
})

const getArcadeResultIcon = ((isArcade:boolean):string => {
  return isArcade ? 'checkmark.png' : 'xmark.png'
})

const hasRadarData = computed(() => {
  return radarData.datasets[0].data[0] != null
})

const getRankTier = computed(() => {
  return currentDifficultyState.value.rank_tier.length > 0 ? currentDifficultyState.value.rank_tier : 'N/A'
})

const radar_options = {
  responsive: true,
  maintainAspectRatio: true,
  scale: {
    r: {
      min: 0,
      max: 100,
      color: 'white',
      /* For some reason, this hides the tick labels??? the maxTicksLimit 1 is required */
      ticks: {
        display: false,
        maxTicksLimit: 1,
        color: 'white'
      }
    }
  }
}

const updateDifficultyState = (idx:number) => {
  currentDifficultyState.value = props.song_info.song_difficulties[idx]

  // Update radar chart
  radarData.datasets = [
    {
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      data: [currentDifficultyState.value.song_effect_radar_notes, currentDifficultyState.value.song_effect_radar_peak, currentDifficultyState.value.song_effect_radar_tsumami, currentDifficultyState.value.song_effect_radar_tricky, currentDifficultyState.value.song_effect_radar_handtrip, currentDifficultyState.value.song_effect_radar_onehanded]
    }
  ]
}
</script>

<template>
    <div class="flex flex-wrap min-w-fit justify-center w-[798px] max-[850px]:w-[422px]">
        <div id='details-text-container' class="w-[414px]">
            <div class="text-xl">
                <div class="relative flex flex-col my-3 items-center select-none pointer-events-none">
                    <img :src="assetsDir + 'jacket_overlay.png'" class="w-48 h-48 z-0 shadow-lg shadow-black">
                    <img :src="assetsJacketsDir + currentDifficultyState.jacket" class="absolute w-44 h-44 mt-2 z-10">
                </div>
                <div class="grid grid-cols-3 gap-4">
                  <div>
                    <h3 class="font-bold">Artist</h3>
                    <span class="font-light text-lg">{{ checkDataForEmpty(props.song_info.song_artist) }}</span>
                  </div>
                  <div>
                    <h3 class="font-bold">Effector</h3>
                    <span class="font-light text-lg">{{ checkDataForEmpty(props.song_info.effector) }}</span>
                  </div>
                  <div>
                    <h3 class="font-bold">BPM</h3>
                    <span class="font-light text-lg">{{ checkDataForEmpty(props.song_info.bpm) }}</span>
                  </div>
                  <div class="col-span-3">
                    <h3 class="font-bold">Jacket Illustrator</h3>
                    <span class="font-light text-lg">{{ checkDataForEmpty(currentDifficultyState.jacket_artist) }}</span>
                  </div>
                  <div>
                    <h3 class="font-bold">Album</h3>
                    <span class="font-light text-lg">{{ checkDataForEmpty(props.song_info.album) }}</span>
                  </div>
                  <div>
                    <h3 class="font-bold">Length</h3>
                    <span class="font-light text-lg">{{ checkDataForEmpty(props.song_info.duration) }}</span>
                  </div>
                  <div>
                    <h3 class="font-bold">Release Date</h3>
                    <span class="font-light text-lg">{{ checkDataForEmpty(props.song_info.song_release_date) }}</span>
                  </div>
                  <div class="mt-2 flex col-span-2">
                    <div class="relative flex">
                        <div class="hover: cursor-pointer w-fit">
                          <div @mouseover="hover_arcade_desc_popup = true" @mouseleave="hover_arcade_desc_popup = false">
                            <span class="text-sky-700 font-semibold hover:text-sky-500">Arcade</span>
                            <HelpDescriptionPopup v-if="hover_arcade_desc_popup" :description="'arcade'"/>
                          </div>
                        </div>
                        <span class="mx-4 my-1">
                            <img class='w-6 h-6' :src="assetsDir + getArcadeResultIcon(currentDifficultyState.isArcade)">
                        </span>
                    </div>
                    <div class="relative flex">
                        <div class="hover: cursor-pointer w-fit">
                          <div @mouseover="hover_konasute_desc_popup = true" @mouseleave="hover_konasute_desc_popup = false">
                            <span class="text-sky-700 font-semibold hover:text-sky-500">Konasute</span>
                            <HelpDescriptionPopup v-if="hover_konasute_desc_popup" :description="'konasute'"/>
                          </div>
                        </div>
                        <span class="mx-4 my-1">
                            <img class='w-6 h-6' :src="assetsDir + getKonasuteResultIcon(currentDifficultyState.isKonasute)">
                        </span>
                    </div>
                  </div>
                </div>
            </div>      
        </div>
        <div id="effect_radar_chart_container" class="w-[386px] flex flex-col">
          <div class="relative w-96 text-lg">
            <div class="pt-2 flex flex-col items-center text-center">
              <div class="w-2/3 rounded-sm hover:cursor-pointer">
                <div class="hover:brightness-125" @click="difficulty_dropdown_menu = !difficulty_dropdown_menu" >
                  <button class="text-3xl font-semibold select-none" :class="diffTextColorLookupTable[currentDifficultyState.difficulty_name]">{{ currentDifficultyState.difficulty_name }}
                  </button>
                  <span class="absolute">
                      <img class="mx-4 my-1.5 w-6 h-6 select-none"  :src="assetsDir + 'dropdown-arrow.png'">
                  </span>
                </div>
                <Transition enter-active-class="transition-opacity ease-linear duration-150" enter-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition-opacity ease-linear duration-150" leave-class="opacity-100" leave-to-class="opacity-0">
                  <div v-if="difficulty_dropdown_menu" class="absolute flex flex-col w-2/3 shadow-sm shadow-black bg-[#030303] border-l border-gray-700 rounded-r-xl z-10">
                    <div v-for="(diff, index) in props.song_info.song_difficulties" :key="diff" @click="updateDifficultyState(index); difficulty_dropdown_menu = false" class="-ml-0.5 p-2 hover:cursor-pointer border-l-2 hover:border-indigo-500 hover:text-indigo-400">
                        {{ diff.difficulty_name }}
                    </div>
                  </div>
                </Transition>
              </div>

              <h2 class="font-thin">Difficulty Style Radar</h2>
            </div>
            <Radar :data="radarComputed" :options="radar_options"></Radar>
            <span v-if="!hasRadarData" class="absolute bottom-40 text-center bg-yellow-500 bg-opacity-20 rounded-xl right-2">
                No Radar Data Found<br>Please help contribute this information. Thanks!
            </span>
          </div>

          <div id='tier_list_rank' class="mt-auto flex items-center text-lg">
            <div class="relative :hover cursor-pointer" @mouseover="hover_tierlist_desc_popup = true" @mouseleave="hover_tierlist_desc_popup = false">
                <span class="text-emerald-400 hover:text-emerald-200">Level Relative Clear Difficulty</span>
                <HelpDescriptionPopup v-if="hover_tierlist_desc_popup" :description="'tierlist'"/>
            </div>
            <p class="px-2">Rank:</p>
            <p class="text-3xl w-10 mr-4" :class="rankColorLookupTable[currentDifficultyState.rank_tier]">{{ getRankTier }}</p>
          </div>
        </div>


        <div class="m-8 h-fit">
            <table class="table-auto text-center m-auto font-semibold">
                <thead>
                    <tr class="border-b">
                    <th class="w-32">Difficulty</th>
                    <th class="w-32">Level</th>
                    <th class="w-32">Max Chain</th>
                    <th class="w-32">Max Chip Notes (Tap)</th>
                    <th class="w-32">Max Long Notes (Hold)</th>
                    <th class="w-40">Max Volume Notes (Lasers)</th>
                    </tr>
                </thead>
                <tbody class="hover:bg-gray-800" v-for="difficulty in props.song_info.song_difficulties" :key="difficulty">
                    <tr class="border-b" :class="diffBGColorLookupTable[difficulty.difficulty_name]">
                    <td class="m-6 w-32 border-l">{{ checkDataForEmpty(difficulty.difficulty_name) }}</td>
                    <td class="w-32">{{ checkDataForEmpty(difficulty.difficulty_level) }}</td>
                    <td class="w-32">{{ checkDataForEmpty(difficulty.max_chain) }}</td>
                    <td class="w-32">{{ checkDataForEmpty(difficulty.max_chip_notes) }}</td>
                    <td class="w-32">{{ checkDataForEmpty(difficulty.max_long_notes) }}</td>
                    <td class="w-40 border-r">{{ checkDataForEmpty(difficulty.max_vol_notes) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>