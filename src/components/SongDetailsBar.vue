<script setup lang="ts">
import ExpandedUnlockDescription from './ExpandedUnlockDescription.vue'
import ExpandedDetailsDescription from './ExpandedDetailsDescription.vue'
import ExpandedReportForm from './ExpandedReportForm.vue';
import { reactive } from 'vue'

const props = defineProps(['song_info'])
const selected = reactive({
  details: true,
  unlock: false,
  report: false
})

const setSelectedTab = (tab: String) => {
  switch(tab) {
    case "details":
      selected.details = true
      selected.unlock = false
      selected.report = false
      break
    case "unlock":
      selected.unlock = true
      selected.details = false
      selected.report = false
      break
    case "report":
      selected.report = true
      selected.details = false
      selected.unlock = false
      break
  }
}

</script>

<template>
  <div class="bg-[#050505] bg-opacity-90 px-4 pb-4 min-w-fit">
    <header>
      <nav>
        <ul class="w-full flex text-2xl pt-4 mb-8 font-medium">
          <li class="px-4 h-10 rounded-t-lg hover:text-blue-200 hover:bg-[#0F0F0F] hover:cursor-pointer" :class="(selected.details)?'text-blue-300 border-b-2 border-sky-400':'text-blue-300 hover:rounded-b-lg'" @click="setSelectedTab('details')">
            Details
          </li>
          <li class="ml-2 px-4 h-10 rounded-t-lg hover:text-blue-200 hover:bg-[#0F0F0F] hover:cursor-pointer" :class="(selected.unlock)?'text-blue-300 border-b-2 border-sky-400':'text-blue-300 hover:rounded-b-lg'" @click="setSelectedTab('unlock')">
            Unlocking
          </li>
          <li class="ml-auto px-4 h-10 rounded-t-lg text-blue-300 hover:text-blue-200 hover:bg-[#0F0F0F] hover:cursor-pointer" :class="(selected.report)?'text-blue-300 border-b-2 border-sky-400':'text-blue-300 hover:rounded-b-lg'" @click="setSelectedTab('report')">
            Contribute
          </li>
        </ul>
      </nav>
    </header>
    <ExpandedDetailsDescription v-if="selected.details" :song_info="props.song_info"/>
    <ExpandedUnlockDescription v-if="selected.unlock" :title="props.song_info.title" :arcadeUnlockMethod="props.song_info.arcade_unlock_method" :konasuteUnlockMethod="props.song_info.konasute_unlock_method" :konasuteVolPack="props.song_info.konasute_vol_pack" :songDiffs="props.song_info.song_difficulties"/>
    <ExpandedReportForm v-if="selected.report" :song="props.song_info.title"/>
  </div>
</template>