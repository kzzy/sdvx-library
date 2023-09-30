<script setup lang="ts">
import SearchResults from '../components/SearchResults.vue'
import SearchFilters from '../components/SearchFilters.vue'
import { ref, watch } from 'vue'
import debounce from 'lodash.debounce'

const search_field = ref('')
const active_search = ref(false)

watch(search_field, (value) => {
    if(value.length > 0) {
        active_search.value = true
        search(value)
    } else {
        active_search.value = false
    }
})

const search = debounce((input:string) => {
    console.log("Execute search using: " + input)
    // Execute API call using the search term and filters applied
}, 500)
</script>

<template>
    <body id='body_layout' class="relative h-screen overflow-hidden bg-main">
        <ul class="bg-circles">
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
                <li></li>
			</ul>
        <header>
            <div id="header_container" class="bg-headerbg">
                <div class="m-auto w-min">
                </div>
            </div>
        </header>

        <main>
            <video id="video_background" class="absolute brightness-2 min-w-[1300px] w-screen z-0 object-fill min-h-screen max-h-screen" oncontextmenu="return false;" autoplay loop muted>
                    <source src="../assets/homepage_cmp_15.mp44" type="video/mp4"/>
                    Your browser does not support the video tag.
            </video>

            <div id="background_container" class="relative flex min-h-screen">
                <div id="search_container" :class="(active_search)?'max-w-xs border':'m-auto rounded-xl'">
                    <div id="search_main" class="">
                        <img class="w-12 h-16 m-auto pt-3" src="../assets/pixel_grace.png" alt=":)">
                        <h1 class="text-white text-3xl text-center pt-2 pb-8">Sound Voltex Library</h1>
                        <form>
                            <input v-model="search_field" class="text-center block m-auto py-2.5 px-0 w-1/2 text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" onkeypress="return event.keyCode != 13;" autocomplete="off" type="text" autofocus id="home_search" placeholder="Song Name">
                        </form>
                        <p class="text-white text-sm pt-10 text-center p-4">Replace special characters with english character equivalents except for Japanese songs</p>
                    </div>
                    <div id="search_filters" v-if="active_search">
                        <SearchFilters />
                    </div>
                </div>

                <div id="search_results_container" v-if="active_search" class="w-full">
                    <SearchResults />
                </div>
            </div>
        </main>
    </body>
</template>