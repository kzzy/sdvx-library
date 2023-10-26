<script setup lang="ts">
import ExpandedUnlockDescription from './ExpandedUnlockDescription.vue'
import ExpandedDetailsDescription from './ExpandedDetailsDescription.vue'
import { reactive } from 'vue'

const props = defineProps(['song_info'])
const selected = reactive({
  details: true,
  unlock: false
})

</script>

<template>
  <div class="bg-[#050505] bg-opacity-90 p-4 min-w-fit">
    <header>
      <nav>
        <ul class="relative flex justify-center text-2xl mb-2 font-semibold">
          <li class="mx-4 h-10 hover:text-blue-200 cursor-pointer" :class="(selected.details)?'text-blue-300 border-b-2 border-sky-400 rounded-sm':'text-blue-300'" @click="selected.details=true;selected.unlock=false">
            <div>Details</div>
          </li>
          <li class="mx-4 h-10 hover:text-blue-200 cursor-pointer" :class="(selected.unlock)?'text-blue-300 border-b-2 border-sky-400 rounded-sm':'text-blue-300'" @click="selected.details=false;selected.unlock=true">
            <div>Unlocking</div>
          </li>
        </ul>
      </nav>
    </header>
    <ExpandedDetailsDescription v-if="selected.details" :song_info="props.song_info"/>
    <ExpandedUnlockDescription v-if="selected.unlock" :title="props.song_info.title" :konasuteUnlockMethod="props.song_info.konasute_unlock_method" :konasuteVolPack="props.song_info.konasute_vol_pack" :songDiffs="props.song_info.song_difficulties"/>
  </div>
</template>