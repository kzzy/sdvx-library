<script setup lang="ts">
import MainSearchField from '@/components/MainSearchField.vue'
import SearchFilters from '@/components/SearchFilters.vue'
import SearchResults from '@/components/SearchResults.vue'
import { runAllSongsQuery, runSearchSongsQuery, runChartQuery } from '@/helpers/GraphqlHelper'
import { mapSongResponseToSongData, mapChartResponseToDifficulties } from '@/helpers/MappingFunctions'
import type { SearchFilterInterface } from '@/utils/SearchFilter.interface'
import type { AdvancedSongDataInterface, SongDifficulty } from '@/utils/SongData.interface.ts'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const searchTerm = ref('')
const searchFilters = ref()
const isLoading = ref(false)
const emptySearchResults = ref(true)
const originalSongList = ref()
const filteredSongList = ref()

watch(searchTerm, (value) => {
    // Watcher detected change
    console.log("Parent reading Search Query emit event:", value)
    initSearch(value)
})

watch(searchFilters, (value) => {
    console.log("Parent reading Filter emit event:", value)
    //applySearchFilters(value)
})

const initSearch = (term:string) => {
    isLoading.value = true
    const rawSongResults = term.length > 0 ? runSearchSongsQuery(term) : runAllSongsQuery()

    // Watcher for completion of song queries
    watch(rawSongResults.result, () => {
        const asyncSongCount = ref(0)
        // response field headers need to be remapped if it was a search query or fetch all
        const serializedSongList:AdvancedSongDataInterface[] = rawSongResults.result.value.songs ? rawSongResults.result.value.songs : rawSongResults.result.value.songsLikeName
        let res:AdvancedSongDataInterface[] = []

        if(serializedSongList.length == 0) {
            emptySearchResults.value = true
            return
        } else {
            emptySearchResults.value = false
        }

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
            if(asyncSongCount.value == serializedSongList.length) {
                console.log("Completed all search steps")
                originalSongList.value = res

                // Delay to smoothen result refresh transition
                setTimeout(() => {
                    isLoading.value = false
                    filteredSongList.value = res

                }, 150)
            }
        })
    })

    // Watcher for errors on song queries
    watch(rawSongResults.error, () => {
        console.log('GraphQL Query error:', rawSongResults.error)
    })

}

const filterLookupTable = (filter, filter_val:any, song:AdvancedSongDataInterface) => {
    console.log(filter, filter_val, song)
    if(!filter_val) return true
    
    switch(filter) {
        case "level_range_min":
            for(let diff of song.song_difficulties) {
                if(diff.difficulty_level < filter_val) return false
            }
            return true
        case "level_range_max":
            for(let diff of song.song_difficulties) {
                if(diff.difficulty_level > filter_val) return false
            }
            return true
        default:
            return true
    }
}

const applySearchFilters = (filters:SearchFilterInterface) => {
    let newRes = []
    
    for(let song of originalSongList.value) {
        let passedFilter = true
        for(const filter in filters) {
            if(filterLookupTable(filter, filters[filter], song) == false) {
                console.log("Confirmed filter removal of a song")
                passedFilter = false
                break
            }
        }
        if(passedFilter) newRes.push(song)
    }
    console.log(newRes)
    filteredSongList.value = newRes
}

onMounted(() => {
    const route = useRoute()
    console.log("route", route.params)
    initSearch('')
})
</script>

<template>
    <div class="h-screen flex">
        <div class="w-min bg-[#050505] bg-opacity-95 border-r-2 border-indigo-900 max-[1240px]:hidden">
            <div class="mx-5 py-5 flex flex-col">
                <MainSearchField @toggle_search="(value) => searchTerm = value"/>
                <SearchFilters class="mt-5" @search_filters="(value) => searchFilters = value"/>
                <div class="mt-auto text-white text-center text-xl justify-evenly">
                    <span class="hover:cursor-pointer">Contact</span>
                </div>
            </div>
        </div>
        <div class="relative w-full flex flex-col items-center max-h-screen overflow-y-scroll overflow-x-hidden">
            <div class="w-fit" v-if="!emptySearchResults">
                <div class="w-[876px] text-white text-6xl font-light h-20 max-[875px]:w-full">
                    <h3 class="pl-12 py-2">Results</h3>
                </div>
                <SearchResults :class="[isLoading ? 'transition-opacity ease-out duration-200 opacity-0':'transition-opacity ease-in duration-200 opacity-100']" :updateSongs="filteredSongList"/>
            </div>
            <div v-else class="h-screen w-full flex items-center justify-center text-center">
                <div>
                    <img src="../assets/miku.webp" class="w-80 h-80">
                    <p class="text-white text-3xl font-light pb-2 drop-shadow-2xl">We found nothing :(</p>
                </div>
            </div>
        </div>
    </div>
</template>