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
const hasMoreSearchResults = ref(false)
const savedQueryCursor = ref("")


watch(searchTerm, (value) => {
    // Watcher detected change
    console.log("Parent reading Search Query emit event:", value)
    resetAll()
    runSearch(value, false)
})

watch(searchFilters, (value) => {
    console.log("Parent reading Filter emit event:", value)
    //applySearchFilters(value)
})

const resetAll = () => {
    isLoading.value = false
    searchFilters.value = []
    emptySearchResults.value = true
    originalSongList.value = []
    filteredSongList.value = []
    hasMoreSearchResults.value = false
    savedQueryCursor.value = ""
}

const runSearch = (term:string, isPaginated:boolean) => {
    isLoading.value = true
    const rawSongResults = term ? runSearchSongsQuery(term, savedQueryCursor.value) : runAllSongsQuery(savedQueryCursor.value)

    // Watcher for completion of song queries
    watch(rawSongResults.result, () => {
        const asyncSongCount = ref(0)
        // response field headers need to be remapped if it was a search query or fetch all
        const serializedSongList = rawSongResults.result.value.songs.edges
        let res = new Array<AdvancedSongDataInterface>(serializedSongList.length)

        console.log(serializedSongList)

        // Check for empty results list
        if(serializedSongList.length == 0) {
            emptySearchResults.value = true
            return
        }
        emptySearchResults.value = false

        // Check if there are more results that need to be paginated
        if(rawSongResults.result.value.songs.pageInfo.hasNextPage) { 
            hasMoreSearchResults.value = true
            savedQueryCursor.value = rawSongResults.result.value.songs.pageInfo.endCursor
        } else {
            hasMoreSearchResults.value = false
            savedQueryCursor.value = ""
        }

        for(const idx in serializedSongList) {
            let song = serializedSongList[idx].node
            let songDiffs:SongDifficulty[] = []
            const curSongDiffs = runChartQuery(song.id)

            // Watcher for completion of chart queries
            /* Current problem is async order of chart query completions is controlling the res append order
            */
            watch(curSongDiffs.result, () => {
                curSongDiffs.result.value.charts.edges.forEach(chart => {
                    songDiffs.push(mapChartResponseToDifficulties(chart.node))
                })

                asyncSongCount.value += 1
                res[idx] = mapSongResponseToSongData(song, songDiffs)
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
                // Copy original list incase filters get reset
                originalSongList.value = res

                // Delay to smoothen result refresh transition
                setTimeout(() => {
                    isLoading.value = false
                    setSearchResults(res, isPaginated)
                }, 150)
            }
        })
    })

    // Watcher for errors on song queries
    watch(rawSongResults.error, () => {
        console.log('GraphQL Query error:', rawSongResults.error)
    })
}

const setSearchResults = (value:AdvancedSongDataInterface[], isPaginated:boolean) => {
    if(isPaginated) {
        filteredSongList.value = filteredSongList.value.concat(value)
    } else {
        filteredSongList.value = value
    }
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
    runSearch('', false)
})

const onResultHitBottomScroll = (e) => {
    const scrollTop = e.target.scrollTop
    const scrollHeight = e.target.scrollHeight
    const clientHeight = e.target.clientHeight

    if((scrollTop + clientHeight) >= scrollHeight) {
        if(hasMoreSearchResults.value) {
            runSearch(searchTerm.value, true)
        }
    }
}

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
        <div class="relative w-full flex flex-col items-center max-h-screen overflow-y-scroll overflow-x-hidden" @scroll="onResultHitBottomScroll">
            <div class="w-fit" v-if="!emptySearchResults">
                <div class="w-[876px] text-white text-6xl font-light h-20 flex items-center max-[875px]:w-full">
                    <h3 class="pl-12 py-2">Results</h3>
                    <p v-if="filteredSongList" class="text-lg ml-12">There are {{ filteredSongList.length }} songs</p>
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