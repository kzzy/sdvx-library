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
  <div class="bg-[#050505] p-4">
    <header>
      <nav>
        <ul class="flex justify-center text-2xl mb-2">
          <li class="px-4 hover:text-indigo-400 cursor-pointer" :class="(selected.details)?'text-indigo-400':'text-white'" @click="selected.details=true;selected.unlock=false">
            <div>Details</div>
          </li>
          <li class="px-4 hover:text-indigo-400 cursor-pointer" :class="(selected.unlock)?'text-indigo-400':'text-white'" @click="selected.details=false;selected.unlock=true">
            <div>Unlocking</div>
          </li>
        </ul>
      </nav>
    </header>
    <ExpandedDetailsDescription v-if="selected.details" :song_info="props.song_info"/>
    <ExpandedUnlockDescription v-if="selected.unlock" :title="props.song_info.title" :konasuteUnlockMethod="props.song_info.konasute_unlock_method" :konasuteVolPack="props.song_info.konasute_vol_pack" :songDiffs="props.song_info.song_difficulties"/>
  </div>
</template>