<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { SearchFilterInterface } from '@/utils/SearchFilter.interface.ts'

const emit = defineEmits(['search_filters'])
const default_filter_settings:SearchFilterInterface = {
    game_entry: '',
    level_range_min: null,
    level_range_max: null,
    bpm_range_min: null,
    bpm_range_max: null,
    isArcade: true,
    isKonasute: true,
    konasute_vol_pack: null
}
const filters = reactive(default_filter_settings);
let filter_game_entry_toggle = false

watch(() => [
            filters.level_range_min, 
            filters.level_range_max, 
            filters.bpm_range_min, 
            filters.bpm_range_max
        ], () => {
    console.log("Detected Filter Change")
    emit('search_filters', filters)
})

</script>
<template>
    <div class="text-white text-lg w-fit">
        <h2 class="text-center text-2xl mt-2 mb-4">Filters</h2>
        <div id="search_simple_filters" class="mx-10 min-w-fit w-64">
            <div id="filter_level" class="mb-2">
                Level Range
                <span class="float-right text-base">
                    <input href="#min" class='mr-2 rounded-lg bg-white text-gray-700 text-center w-12 focus:outline-none hover: cursor-pointer' type='text' placeholder="Min" minlength='1' maxlength="2" v-model.number="filters.level_range_min">
                    <input href="#max" class='rounded-lg bg-white text-gray-700 text-center w-12 focus:outline-none hover: cursor-pointer' type='text' placeholder="Max" minlength='1' maxlength="2" v-model.number="filters.level_range_max">
                </span>
            </div>

            <div id="filter_bpm" class="mb-2">
                BPM
                <span class="float-right text-base">
                    <input href="#min" class='mr-2 rounded-lg bg-white text-gray-700 text-center w-12 focus:outline-none hover: cursor-pointer' type='text' placeholder="Min" v-model.number="filters.bpm_range_min">
                    <input href="#max" class='rounded-lg bg-white text-gray-700 text-center w-12 focus:outline-none hover: cursor-pointer' type='text' placeholder="Max" v-model.number="filters.bpm_range_max">
                </span>
            </div>
            <div id="filter_is_arcade" class="mb-2 flex items-center">
                Arcade
                <div class="ml-auto w-4 h-4 outline-dashed outline-2 rounded-full"></div>
            </div>
            <div id="filter_is_konasute" class="mb-2 flex items-center">
                Konasute
                <div class="ml-auto w-4 h-4 outline-dashed outline-2 rounded-full"></div>
            </div>
            <div id="filter_konasute_volume_pack" class="mb-2 flex items-center">
                Volume Pack
                <div class="ml-auto w-4 h-4 outline-dashed outline-2 rounded-full"></div>
            </div>
            <div id="filter_game_entry" class="mb-2">Game Entry
                <button @click="filter_game_entry_toggle = !filter_game_entry_toggle; console.log(filter_game_entry_toggle)" class="float-right">All</button>
            </div>
        </div>
    </div>
</template>