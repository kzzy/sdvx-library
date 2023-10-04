<script setup lang="ts">
let filter_game_entry_toggle = false

</script>
<template>
    <div class="text-white text-lg w-fit">
        <h2 class="text-center text-2xl mt-2 mb-4">Filters</h2>
        <div id="search_simple_filters" class="mx-10 min-w-fit w-64">
            <div id="filter_game_entry" class="mb-2">Game Entry
                <button @click="filter_game_entry_toggle = !filter_game_entry_toggle; console.log(filter_game_entry_toggle)" class="float-right">All</button>
            </div>

            <div id="filter_level"  class="mb-2">
                Level Range
                <span class="float-right text-base">
                    <input href="#min" class='mr-2 rounded-lg bg-white text-gray-700 text-center w-12 focus:outline-none hover: cursor-pointer' type='text' placeholder="Min" minlength='1' maxlength="2">
                    <input href="#max" class='rounded-lg bg-white text-gray-700 text-center w-12 focus:outline-none hover: cursor-pointer' type='text' placeholder="Max" minlength='1' maxlength="2">
                </span>
            </div>

            <div id="filter_bpm"  class="mb-2">
                BPM
                <span class="float-right text-base">
                    <input href="#min" class='mr-2 rounded-lg bg-white text-gray-700 text-center w-12 focus:outline-none hover: cursor-pointer' type='text' placeholder="Min">
                    <input href="#max" class='rounded-lg bg-white text-gray-700 text-center w-12 focus:outline-none hover: cursor-pointer' type='text' placeholder="Max">
                </span>
            </div>

            <div id="filter_is_konasute"  class="mb-2">
                Konasute
                <span class="float-right">Test</span>
            </div>
            <div id="filter_konasute_volume_pack"  class="mb-2">
                Konasute Volume Pack
                <span class="float-right">Test</span>
            </div>
        </div>
    </div>
</template>