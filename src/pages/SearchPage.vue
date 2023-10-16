<script setup lang="ts">
import MainSearchField from '../components/MainSearchField.vue'
import SearchFilters from '../components/SearchFilters.vue'
import SearchResults from '../components/SearchResults.vue'
import { ref } from 'vue'

const active_search = ref(['', false])
</script>

<template>
    <div class="h-screen" :class="(active_search[1])?'w-min bg-[#050505] bg-opacity-95 border-r-2 border-indigo-900 max-md:hidden':'w-screen flex justify-center items-center'">
        <div class="mx-5 py-5 flex flex-col">
            <MainSearchField @toggle_search="(value) => active_search = value"/>
            <SearchFilters v-if="active_search[1]" class="mt-5"/>
            <div v-if="active_search[1]" class="mt-auto text-white text-center text-xl flex justify-evenly">
                <span class="hover:cursor-pointer">Contact</span>
            </div>
        </div>
    </div>
    <SearchResults v-if="active_search[1]" class="relative w-full"/>
</template>