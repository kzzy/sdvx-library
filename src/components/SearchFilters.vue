<script setup lang="ts">
let filter_game_entry_toggle = false

</script>
<template>
    <div class="text-white border text-md">
        <h2 class="text-center text-xl mt-2 mb-2">Filters</h2>
        <div id="search_simple_filters" class="ml-10 mr-10 border min-w-fit">
            <div id="filter_game_entry">Game Entry
                <button @click="filter_game_entry_toggle = !filter_game_entry_toggle; console.log(filter_game_entry_toggle)" class="float-right">All</button>
            </div>
            <div id="filter_level" >
                Level Range
                <span class="float-right">
                    <a href="#">1</a>
                    <a href="#">20 </a>
                </span>
            </div>
            <div id="filter_is_arcade">
                Arcade
                <span class="float-right">Test</span>
            </div>
            <div id="filter_is_konasute">Konasute</div>
        </div>
        <h2 class="text-center text-xl mt-2 mb-2">Advanced Filters</h2>
        <div id="search_advanced_filters" class="ml-10 mr-10 border">
        </div>
    </div>
</template>