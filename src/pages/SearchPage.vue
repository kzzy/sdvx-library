<script setup lang="ts">
import MainSearchField from '@/components/MainSearchField.vue'
import SearchFilters from '@/components/SearchFilters.vue'
import SearchResults from '@/components/SearchResults.vue'
import { buildQuery } from '@/helpers/graphqlHelper'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import { useQuery } from "@vue/apollo-composable"
import gql from "graphql-tag"

const searchTerm = ref('')
const searchFilters = ref()

watch(searchTerm, () => {
    // Watcher detected change
    console.log("Parent reading emit event:", searchTerm.value)
    initSearch(searchTerm.value)
})

const initSearch = (term:string) => {
    // Retrieve Filters -> Construct Query -> Call API -> Populate Search Results with the response
    buildQuery()
}


onMounted(() => {
    const route = useRoute()
    console.log("route", route.params)
})
</script>

<template>
    <div class="h-screen flex">
        <div class="w-min bg-[#050505] bg-opacity-95 border-r-2 border-indigo-900 max-md:hidden">
            <div class="mx-5 py-5 flex flex-col">
                <MainSearchField @toggle_search="(value) => searchTerm = value"/>
                <SearchFilters class="mt-5"/>
                <div class="mt-auto text-white text-center text-xl justify-evenly">
                    <span class="hover:cursor-pointer">Contact</span>
                </div>
            </div>
        </div>
        <SearchResults class="relative w-full"/>
    </div>  
</template>