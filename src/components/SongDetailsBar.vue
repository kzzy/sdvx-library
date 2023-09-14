<script setup lang="ts">
import { onMounted, reactive, computed, ref} from 'vue'
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler } from 'chart.js'
import { Radar } from 'vue-chartjs'
import HelpDescriptionPopup from './HelpDescriptionPopup.vue'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
)

const props = defineProps(['song_info'])
const hover_konasute_desc_popup = ref(false)
const hover_tierlist_desc_popup = ref(false)
const difficulty_dropdown_menu = ref(false)
const currentDifficultyState = ref(props.song_info.song_difficulties[props.song_info.song_difficulties.length-1])

const selected = reactive({
  details: true,
  unlock: false
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

const diffTextColorLookupTable: { [key:string]:string } = {
  "NOVICE": "text-indigo-400",
  "ADVANCED": "text-yellow-400",
  "EXHAUST": "text-red-400",
  "HEAVENLY": "text-cyan-400",
  "INFINITE": "text-pink-400",
  "GRAVITY": "text-orange-400",
  "VIVID": "text-pink-400",
  "MAXIMUM": "text-gray-400",
  "EXCEED": "text-cyan-400"
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

const radarData = reactive({
  labels: ['NOTES', 'PEAK', 'TSUMAMI ', 'TRICKY', 'HAND TRIP', 'ONE HAND'],
  datasets: [
    {
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      data: []
    }
  ]
})

const radarComputed = computed(() => {
  return {
    labels: ['NOTES', 'PEAK', 'TSUMAMI ', 'TRICKY', 'HAND TRIP', 'ONE HAND'],
    datasets: [
      {
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        data: radarData.datasets.data
      }
    ]
  }
})

const hasRadarData = computed(() => {
  return radarData.datasets.data.length > 0
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

const setRadarData = (notes:number, peak:number, tsumami:number, tricky:number, handtrip: number, onehand: number) => {
  radarData.datasets.data = [notes, peak, tsumami, tricky, handtrip, onehand]
}

const updateDifficultyState = (idx:number) => {
  currentDifficultyState.value = props.song_info.song_difficulties[idx]
}

onMounted(() => {
  console.log(props.song_info)
})

</script>
<template>
    <header>
      <nav>
        <ul class="flex justify-center text-xl">
          <li class="px-4 hover:text-indigo-400 cursor-pointer" :class="(selected.details)?'text-indigo-400':'text-white'" @click="selected.details=true;selected.unlock=false">
            <div>Details</div>
          </li>
          <li class="px-4 hover:text-indigo-400 cursor-pointer" :class="(selected.unlock)?'text-indigo-400':'text-white'" @click="selected.details=false;selected.unlock=true">
            <div>Unlocking</div>
          </li>
        </ul>
      </nav>
    </header>
    <body id="expanded_details_body_container" v-if="selected.details">
      <div class="m-5 rounded-xl border-indigo-900 border-4 bg-gray-900 bg-opacity-80 flex flex-col min-w-fit">
        <div id='details-text-container' class="flex justify-around">
          <div id="jacket_info" class="mx-5 text-xl mt-auto">
            <p class="py-4">Charted by {{ props.song_info.charter }}</p>
            <p class="py-4">Jacket Artist: {{ props.song_info.jacket_artist }}</p>
            <p class="py-4">Album: {{ props.song_info.album }}</p>
            <p class="py-4">Arcade {{ }}</p>
            <div class="relative my-4 w-fit hover: cursor-pointer" @mouseover="hover_konasute_desc_popup = true" @mouseleave="hover_konasute_desc_popup = false">
              <span class="text-emerald-300">Konasute</span>
              <span v-if="hover_konasute_desc_popup"> <HelpDescriptionPopup :description="'konasute'"/></span>
            </div>
            <p class="py-4">{{ props.song_info.title }} was initially released on {{ props.song_info.song_release_date }}</p>
          </div>
          
          <div id="effect_radar_chart_container" class="my-3.5" :setRadarData="setRadarData(currentDifficultyState.song_effect_radar_notes, currentDifficultyState.song_effect_radar_peak, currentDifficultyState.song_effect_radar_tsumami, currentDifficultyState.song_effect_radar_tricky, currentDifficultyState.song_effect_radar_handtrip, currentDifficultyState.song_effect_radar_onehanded)">
            <div class="relative w-96 text-center text-lg">
                <div class="pt-2">
                  <button class="text-3xl font-semibold text-center hover: cursor-pointer" :class="diffTextColorLookupTable[currentDifficultyState.difficulty_name]" @click="difficulty_dropdown_menu = true">{{ currentDifficultyState.difficulty_name }}</button>
                  <div v-if="difficulty_dropdown_menu" class="absolute my-1 pt-2 pb-2 flex flex-col w-full shadow-xl bg-indigo-950 rounded-xl" @mouseleave="difficulty_dropdown_menu = false">
                    <div v-for="(diff, index) in props.song_info.song_difficulties" @click="updateDifficultyState(index); difficulty_dropdown_menu = false" class="p-2 hover:cursor-pointer hover:bg-indigo-800">
                      {{ diff.difficulty_name }}
                    </div>
                  </div>

                </div>
                <h2 class="font-thin">Difficulty Style Radar</h2>
                <Radar :data="radarComputed" :options="radar_options"></Radar>
                <span v-if="!hasRadarData">
                  No Radar Data, Please contribute this through the contacts. Thanks!
                </span>
            </div>

            <div id='tier_list_rank' class="flex items-center text-lg">
              <div class="relative w-fit :hover cursor-pointer" @mouseover="hover_tierlist_desc_popup = true" @mouseleave="hover_tierlist_desc_popup = false">
                <span class="text-emerald-300">Community First Clear Difficulty Tier List</span>
                <span v-if="hover_tierlist_desc_popup">
                  <HelpDescriptionPopup :description="'tierlist'"/>
                </span>
              </div>
              <p class="px-2">Rank:</p>
              <p class="text-3xl flex-1 mr-3 w-10" :class="rankColorLookupTable[currentDifficultyState.rank_tier]">{{ getRankTier }}</p>
            </div>
          </div>
        </div>
        <div class="m-8">
          <table class="table-auto text-center m-auto font-semibold outline outline-offset-16 rounded-lg outline-emerald-900">
            <thead>
              <tr class="border-b">
                <th class="w-32">Difficulty</th>
                <th class="w-32">Level</th>
                <th class="w-32">Max Chain</th>
                <th class="w-32">Max Chip Notes (Tap)</th>
                <th class="w-32">Max Long Notes (Holding)</th>
                <th class="w-40">Max Volume Notes (Lasers)</th>
              </tr>
            </thead>
            <tbody class="hover:bg-gray-800" v-for="difficulty in props.song_info.song_difficulties">
              <tr class="border-b" :class="diffBGColorLookupTable[difficulty.difficulty_name]">
                <td class="m-6 w-32 border-l">{{ difficulty.difficulty_name }}</td>
                <td class="w-32">{{ difficulty.difficulty_level }}</td>
                <td class="w-32">{{ difficulty.max_chain }}</td>
                <td class="w-32">{{ difficulty.max_chip_notes }}</td>
                <td class="w-32">{{ difficulty.max_long_notes }}</td>
                <td class="w-40 border-r">{{ difficulty.max_vol_notes }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </body>

    <body id="expanded_unlock_body_container" v-if="selected.unlock" class="">
      <div class="m-5 rounded-xl border-indigo-900 border-4 bg-gray-900 bg-opacity-80">
        <p class="m-5">
        </p>
      </div>
    </body>
</template>