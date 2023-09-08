<script setup lang="ts">
import { onMounted, ref, reactive, computed } from 'vue'

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

/*
    jacket_artist: string;
    charter: string;
    album: string;

    isKonasute?: boolean;
    konasute_vol_pack?: number;

    konasute_unlock_method?: string;
    arcade_unlock_method?: string;

    song_release_date: string;
*/

onMounted(() => {
  console.log(props.song_info)
})

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
    <body id="expanded_details_body_container" v-if="selected.details" class="h-expanded-details">
      <div class="m-5 rounded-xl border-indigo-900 border-4 bg-gray-900 bg-opacity-80">
        <div class="m-8">
          <table class="table-auto text-center m-auto font-semibold outline outline-offset-16 rounded-lg outline-yellow-400">
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

        <div id="effect_chart" class="border">
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

