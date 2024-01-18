<script setup lang="ts">
import SearchFilters from '@/components/SearchFilters.vue'
import SearchResults from '@/components/SearchResults.vue'
import { runAllSongsQuery, runSearchSongsQuery, runChartQuery } from '@/helpers/GraphqlHelper'
import { mapSongResponseToSongData, mapChartResponseToDifficulties } from '@/helpers/MappingFunctions'
import { assetsDir } from '@/helpers/LookupTables'
import type { SearchFilterInterface } from '@/utils/SearchFilter.interface'
import type { AdvancedSongDataInterface, SongDifficulty } from '@/utils/SongData.interface.ts'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import debounce from 'lodash.debounce'

const router = useRouter()
const searchTerm = ref('')
const searchFilters = ref()
const isLoading = ref(true)
const emptySearchResults = ref(true)
const originalSongList = ref()
const filteredSongList = ref([])
const hasMoreSearchResults = ref(false)
const savedQueryCursor = ref('')
const currentSongCountView = ref(0)
const totalSongCountView = ref(0)

watch(searchTerm, (value) => {
    debounceRunSearch(value)
})

const debounceRunSearch = debounce((input:string) => {
    console.log("Execute search using: " + input)
    resetCoreSettings()
    router.replace({ query: {q: input}})
    runSearch(input)
}, 800)

watch(searchFilters, (value) => {
    debounceApplySearchFilters(value)
}, {
    deep: true
})

const debounceApplySearchFilters = debounce((input:any) => {
    console.log("Parent reading Filter emit event:", input)
    applySearchFilters(input)
}, 800)

const resetCoreSettings = () => {
    searchFilters.value = []
    originalSongList.value = []
    filteredSongList.value = []
    hasMoreSearchResults.value = false
    savedQueryCursor.value = ""
}

const runSearch = (term:string='') => {
    const rawSongResults = term ? runSearchSongsQuery(term, savedQueryCursor.value) : runAllSongsQuery(savedQueryCursor.value)
    // Enable loading animation in the scenario of new searches and excluding pagination
    if(filteredSongList.value.length == 0) {
        isLoading.value = true
    }

    // Watcher for completion of song queries
    watch(rawSongResults.result, () => {
        const asyncSongCount = ref(0)
        // response field headers need to be remapped if it was a search query or fetch all
        const serializedSongList = rawSongResults.result.value.songs.edges
        let res = new Array<AdvancedSongDataInterface>(serializedSongList.length)

        console.log(serializedSongList)

        // Check for empty results list
        if(serializedSongList.length == 0) {
            // Update states
            updateState(0, true, [], rawSongResults.result.value.songs.pageInfo.hasNextPage, rawSongResults.result.value.songs.pageInfo.endCursor?rawSongResults.result.value.songs.pageInfo.endCursor:'')
            return
        }

        for(const idx in serializedSongList) {
            let song = serializedSongList[idx].node
            let songDiffs:SongDifficulty[] = []
            const curSongDiffs = runChartQuery(song.id)

            // Watcher for completion of chart queries
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
                updateState(rawSongResults.result.value.songs.totalCount, false, res, rawSongResults.result.value.songs.pageInfo.hasNextPage, rawSongResults.result.value.songs.pageInfo.endCursor?rawSongResults.result.value.songs.pageInfo.endCursor:'')
            }
        })
    })

    // Watcher for errors on song queries
    watch(rawSongResults.error, () => {
        console.log('GraphQL Query error:', rawSongResults.error)
    })
}

const updateState = (newTotalSongCountView?: number, newEmptySearchResults?: boolean, newSongResults?: AdvancedSongDataInterface[], newHasMoreSearchResults?: boolean, newQueryCursor?: string) => {
    if(newTotalSongCountView != undefined) { totalSongCountView.value = newTotalSongCountView }
    if(newEmptySearchResults != undefined) { emptySearchResults.value = newEmptySearchResults }
    if(newSongResults != undefined) { filteredSongList.value = filteredSongList.value.concat(newSongResults); currentSongCountView.value = filteredSongList.value.length }
    if(newHasMoreSearchResults != undefined) { hasMoreSearchResults.value = newHasMoreSearchResults }
    if(newQueryCursor != undefined) { 
        savedQueryCursor.value = newQueryCursor
        console.log(savedQueryCursor, newQueryCursor)
    }
    isLoading.value = false
}

const filterLookupTable = (filter, filter_val:any, song:AdvancedSongDataInterface) => {
    console.log(filter, filter_val, song)
    if(!filter_val) return true
    
    switch(filter) {
        case "level_range_min":
            let containsMinDiff:boolean = false
            for(let diff of song.song_difficulties) {
                if(diff.difficulty_level >= filter_val) {
                    containsMinDiff = true
                    break
                }
            }
            return containsMinDiff
        case "level_range_max":
            let containsMaxDiff:boolean = false
            for(let diff of song.song_difficulties) {
                if(diff.difficulty_level <= filter_val) {
                    containsMaxDiff = true
                    break
                }
            }
            return containsMaxDiff
        default:
            return true
    }
}

const applySearchFilters = (filters:SearchFilterInterface) => {
    let newRes = []
    
    for(let song of originalSongList.value) {
        if((typeof filters['level_range_min'] != 'undefined' && filters['level_range_min']) && (typeof filters['level_range_max'] != 'undefined' && filters['level_range_max']))  {
            console.log("Both not null")
            let satisfyLevelFilter = false

            for(let diff of song.song_difficulties) {
                if(diff.difficulty_level >= filters['level_range_min'] && diff.difficulty_level <= filters['level_range_max']) {
                    satisfyLevelFilter = true
                    break
                }
            }

            if(!satisfyLevelFilter) continue

        } else if(filters['level_range_min'] != null && filters['level_range_max'] == null) {
            console.log("min not null")
            let satisfyLevelFilter = false

            for(let diff of song.song_difficulties) {
                if(diff.difficulty_level >= filters['level_range_min']) {
                    satisfyLevelFilter = true
                    break
                }
            }

            if(!satisfyLevelFilter) continue
        } else if(filters['level_range_min'] == null && filters['level_range_max'] != null) {
        console.log("max not null")
            let satisfyLevelFilter = false

            for(let diff of song.song_difficulties) {
                if(diff.difficulty_level <= filters['level_range_max']) {
                    satisfyLevelFilter = true
                    break
                }
            }

            if(!satisfyLevelFilter) continue
        }

        /*for(const filter in filters) {
            if(filterLookupTable(filter, filters[filter], song) == false) {
                console.log("Confirmed filter removal of a song")
                passedFilter = false
                break
            }
        } */
        newRes.push(song)
    }
    console.log(newRes)
    filteredSongList.value = newRes
}

onMounted(() => {
    const route = useRoute()
    console.log("route query", route.query.q)
    if(route.query.q) { 
        searchTerm.value = route.query.q as string 
    } else {
        runSearch(searchTerm.value)
    }
})

const onResultHitBottomScroll = (e:any) => {
    const scrollTop = e.target.scrollTop
    const scrollHeight = e.target.scrollHeight
    const clientHeight = e.target.clientHeight

    if((scrollTop + clientHeight) >= scrollHeight) {
        console.log(hasMoreSearchResults.value)
        if(hasMoreSearchResults.value) {
            runSearch(searchTerm.value)
        }
    }
}

</script>

<template>
    <div class="h-screen flex">
        <div class="w-min bg-[#050505] bg-opacity-95 border-r-2 border-indigo-900 max-[1240px]:hidden">
            <div class="mx-5 py-5 flex flex-col">
                <div class="rounded-3xl bg-mainNight bg-opacity-95 outline-indigo-900 outline outline-1 shadow-green-500 shadow-md w-fit">
                    <img class="w-12 h-16 m-auto pt-3 hover:cursor-pointer" :src="assetsDir + 'pixel_grace.png'" alt=":)" @click="router.push({ path: '/' })">
                    <div class="text-white text-3xl text-center pt-2 pb-8 font-bold">
                        <h1>SDVX Library</h1>
                    </div>
                    <form>
                        <input v-model="searchTerm" class="text-center block m-auto py-2.5 px-0 w-1/2 font-mono text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" onkeypress="return event.keyCode != 13;" autocomplete="off" type="text" autofocus id="home_search" placeholder="Song Name">
                    </form>
                    <p class="text-white text-sm pt-10 text-center p-4">Replace special characters with english character equivalents except for Japanese songs</p>
                </div>
                <SearchFilters class="mt-5" @search_filters="(value) => searchFilters = value"/>
            </div>
        </div>
        <div class="relative w-full flex flex-col items-center max-h-screen overflow-y-scroll overflow-x-hidden" @scroll="onResultHitBottomScroll">
            <div v-show="!emptySearchResults" class="w-fit">
                    <div class="w-[876px] text-white text-6xl font-light h-20 flex items-center max-[875px]:w-full">
                        <h3 class="pl-12 py-2">Results</h3>
                        <p class="text-2xl ml-12 max-md:text-xl">Showing {{ currentSongCountView }} songs out of {{ totalSongCountView }}</p>
                    </div>
                    <SearchResults :updateSongs="filteredSongList"/>
            </div>
            <div v-show="!isLoading">
                <div v-show="emptySearchResults" class="h-screen w-full flex items-center justify-center text-center">
                    <div>
                        <img :src="assetsDir + 'miku.webp'" class="w-80 h-80">
                        <p class="text-white text-3xl font-light pb-2 drop-shadow-2xl">We found nothing :(</p>
                    </div>
                </div>
            </div>
            <div v-show="isLoading" class="h-screen w-full flex items-center justify-center text-center">
                <img class="w-40 h-40" :src="assetsDir + 'spinner.svg'">
            </div>
        </div>
    </div>
</template>