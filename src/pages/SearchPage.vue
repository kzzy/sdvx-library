<script setup lang="ts">
import MainSearchField from '@/components/MainSearchField.vue'
import SearchFilters from '@/components/SearchFilters.vue'
import SearchResults from '@/components/SearchResults.vue'
import { runSongQuery, runChartQuery } from '@/helpers/GraphqlHelper'
import { mapSongResponseToSongData, mapChartResponseToDifficulties } from '@/helpers/MappingFunctions'
import type { AdvancedSongDataInterface, SongDifficulty } from '@/utils/SongData.interface.ts'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const searchTerm = ref('')
const searchFilters = ref()
const filteredSongList = ref()
const asyncSongCount = ref(0)


watch(searchTerm, () => {
    // Watcher detected change
    console.log("Parent reading emit event:", searchTerm.value)
    initSearch(searchTerm.value)
})

// Watcher for query completion

const initSearch = (term:string) => {
    // Run Song Query -> Filter on application -> Run Chart query on remaining songs to populate songDifficulties array -> Populate Search Results with the response
    const rawSongResults = runSongQuery(term)
    console.log("Ran Query?")
    // Watcher for completion of song queries
    watch(rawSongResults, () => {
        console.log(rawSongResults)
        let res:AdvancedSongDataInterface[] = []
        asyncSongCount.value = 0

        for(const song of rawSongResults.value.songsLikeName) {
            let songDiffs:SongDifficulty[] = []
            const curSongDiffs = runChartQuery(song.title)

            // Watcher for completion of chart queries
            watch(curSongDiffs, () => {
                curSongDiffs.value.chartsByName.forEach(chart => {
                    songDiffs.push(mapChartResponseToDifficulties(chart))
                })

                asyncSongCount.value += 1
                res.push(mapSongResponseToSongData(song, songDiffs))
            })
        }
        // Watcher for completion of all the chart queries
        watch(asyncSongCount, () => {
            if(asyncSongCount.value == rawSongResults.value.songsLikeName.length) {
                console.log("Completed all search steps")
                filteredSongList.value = res
            }
        })
    })

}

onMounted(() => {
    const route = useRoute()
    console.log("route", route.params)
})
</script>

<template>
    <div class="h-screen flex">
        <div class="w-min bg-[#050505] bg-opacity-95 border-r-2 border-indigo-900 max-[1100px]:hidden">
            <div class="mx-5 py-5 flex flex-col">
                <MainSearchField @toggle_search="(value) => searchTerm = value"/>
                <SearchFilters class="mt-5"/>
                <div class="mt-auto text-white text-center text-xl justify-evenly">
                    <span class="hover:cursor-pointer">Contact</span>
                </div>
            </div>
        </div>
        <SearchResults class="relative w-full" :updateSongs="filteredSongList"/>
    </div>  
</template>