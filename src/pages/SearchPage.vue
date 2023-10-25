<script setup lang="ts">
import MainSearchField from '@/components/MainSearchField.vue'
import SearchFilters from '@/components/SearchFilters.vue'
import SearchResults from '@/components/SearchResults.vue'
import { runAllSongsQuery, runSearchSongsQuery, runChartQuery } from '@/helpers/GraphqlHelper'
import { mapSongResponseToSongData, mapChartResponseToDifficulties } from '@/helpers/MappingFunctions'
import type { AdvancedSongDataInterface, SongDifficulty } from '@/utils/SongData.interface.ts'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const searchTerm = ref('')
const searchFilters = ref()
const isLoading = ref(false)
const filteredSongList = ref()

watch(searchTerm, () => {
    // Watcher detected change
    console.log("Parent reading emit event:", searchTerm.value)
    initSearch(searchTerm.value)
})

// Watcher for query completion

const initSearch = (term:string) => {
    isLoading.value = true
    const rawSongResults = term.length > 0 ? runSearchSongsQuery(term) : runAllSongsQuery()

    // Watcher for completion of song queries
    watch(rawSongResults.result, () => {
        const asyncSongCount = ref(0)
        // response field headers need to be remapped if it was a search query or fetch all
        const serializedSongList:AdvancedSongDataInterface[] = rawSongResults.result.value.songs ? rawSongResults.result.value.songs : rawSongResults.result.value.songsLikeName
        let res:AdvancedSongDataInterface[] = []

        for(const song of serializedSongList) {
            let songDiffs:SongDifficulty[] = []
            const curSongDiffs = runChartQuery(song.title)

            // Watcher for completion of chart queries
            watch(curSongDiffs.result, () => {
                curSongDiffs.result.value.chartsByName.forEach(chart => {
                    songDiffs.push(mapChartResponseToDifficulties(chart))
                })

                asyncSongCount.value += 1
                res.push(mapSongResponseToSongData(song, songDiffs))
            })
            // Watcher for errors on chart queries
            watch(curSongDiffs.error, () => {
                console.log('GraphQL Query error:', curSongDiffs.error)
            })
        }
        // Watcher for completion of all the chart queries
        watch(asyncSongCount, () => {
            console.log('asyncSongCount:',asyncSongCount)
            if(asyncSongCount.value == serializedSongList.length) {
                console.log("Completed all search steps")
                
                // Delay to smoothen result refresh transition
                setTimeout(() => {
                    isLoading.value = false
                    filteredSongList.value = res
                }, 250)
            }
        })
    })

    // Watcher for errors on song queries
    watch(rawSongResults.error, () => {
        console.log('GraphQL Query error:', rawSongResults.error)
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
        <div class="relative w-full flex flex-col items-center max-h-screen overflow-y-scroll overflow-x-hidden">
            <div class="w-fit">
                <div class="w-full text-white text-6xl font-light">
                    <h3 class="pl-12 py-2">Results</h3>
                </div>
                <SearchResults :class="[isLoading ? 'transition-opacity ease-out duration-200 opacity-0':'transition-opacity ease-in duration-200 opacity-100']" :updateSongs="filteredSongList"/>
            </div>
        </div>
    </div>  
</template>