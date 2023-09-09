<script setup lang="ts">
import { onMounted, reactive, computed, ref, watch } from 'vue'
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler } from 'chart.js'
import { Radar } from 'vue-chartjs'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
)

const props = defineProps(['song_info'])

const selected = reactive({
  details: true,
  unlock: false,
  history: false
})

function setSelected(select: string) {
  for(const prop in selected) {
    if(prop != select) {
      selected[prop] = false;
    } else {
      selected[prop] = true;
    }
  }
}

function getDiffBGColor(diff:string) {
  switch(diff) {
    case("NOVICE"):
      return "bg-indigo-900"
    case("ADVANCED"):
      return "bg-yellow-600"
    case "EXHAUST":
      return "bg-red-600"
    case "HEAVENLY":
      return "bg-cyan-700"
    case "INFINITE":
      return "bg-pink-700"
    case "GRAVITY":
      return "bg-orange-600"
    case "VIVID":
      return "bg-pink-600"
    case "MAXIMUM":
      return "bg-gray-600"
    case "EXCEED":
      return "bg-cyan-600"
  }
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

const setRadarData = (notes:number, peak:number, tsumami:number, tricky:number, handtrip: number, onehand: number) => {
  radarData.datasets.data = [notes, peak, tsumami, tricky, handtrip, onehand]
}

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

onMounted(() => {
  console.log(props.song_info)
})

/*
    fillEffectRadarDataPoints(
              props.song_info.song_difficulties[0].song_effect_radar_notes,
              props.song_info.song_difficulties[0].song_effect_radar_peak,
              props.song_info.song_difficulties[0].song_effect_radar_tsumami,
              props.song_info.song_difficulties[0].song_effect_radar_tricky,
              props.song_info.song_difficulties[0].song_effect_radar_handtrip,
              props.song_info.song_difficulties[0].song_effect_radar_onehanded
              )
*/

</script>
<template>
    <header>
      <nav>
        <ul class="flex justify-center text-xl">
          <li class="px-4 hover:text-indigo-400 cursor-pointer" :class="(selected.details)?'text-indigo-400':'text-white'" @click="setSelected('details')">
            <div>Details</div>
          </li>
          <li class="px-4 hover:text-indigo-400 cursor-pointer" :class="(selected.unlock)?'text-indigo-400':'text-white'" @click="setSelected('unlock')">
            <div>Unlocking</div>
          </li>
          <li class="px-4 hover:text-indigo-400 cursor-pointer" :class="(selected.history)?'text-indigo-400':'text-white'" @click="setSelected('history')">
            <div>History</div>
          </li>
        </ul>
      </nav>
    </header>
    <body id="expanded_details_body_container" v-if="selected.details" class="h-expanded-drop">
      <div class="m-5 rounded-xl border-indigo-900 border-4 bg-gray-900 bg-opacity-80 flex flex-col">
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
              <tr class="border-b" :class="getDiffBGColor(difficulty.difficulty_name)">
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

        <div id="jacket_info" class="mx-8 text-xl">
          <p>Extra Info</p>
        </div>

        <div id="effect_radar_chart_container" class="m-3" :setRadarData="setRadarData(props.song_info.song_difficulties[0].song_effect_radar_notes, props.song_info.song_difficulties[0].song_effect_radar_peak, props.song_info.song_difficulties[0].song_effect_radar_tsumami, props.song_info.song_difficulties[0].song_effect_radar_tricky, props.song_info.song_difficulties[0].song_effect_radar_handtrip, props.song_info.song_difficulties[0].song_effect_radar_onehanded)">
          <div class="relative 96 w-96 ml-auto mr-48">
              <div class="pt-2 text-center text-lg">
                <h1 class="text-3xl font-semibold my-1">Gravity</h1>
                <div id="dropdown-content" class="hidden">

                </div>
                <h2 class="font-thin">Song Effect Radar</h2>
              </div>
              <Radar :data="radarComputed" :options="radar_options"></Radar>
          </div>
        </div>
      </div>
    </body>

    <body id="expanded_unlock_body_container" v-if="selected.unlock" class="h-expanded-drop">
      <div class="m-5 rounded-xl border-indigo-900 border-4 bg-gray-900 bg-opacity-80">
        <p class="m-5">
        </p>
      </div>
    </body>

    <body id="expanded_history_body_container" v-if="selected.history" class="h-expanded-drop">
      <div class="m-5 rounded-xl border-indigo-900 border-4 bg-gray-900 bg-opacity-80">
        <div class="m-5">
          <p>{{ props.song_info.title }}'s initial release date was {{ props.song_info.song_release_date }}</p>
        </div>
      </div>
    </body>
</template>