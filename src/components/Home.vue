<script setup lang="ts">
import NavBar from './NavBar.vue'
import SearchResults from './SearchResults.vue'
import { ref, watch } from 'vue'
import debounce from 'lodash.debounce'

// Title, Song Artist, Jacket, Jacket Artist, Charter, Duration, Song Difficulties, Difficulty Release Date, Song Release Date,
interface SongData {
    title: string;
    jacket: string;
    jacket_artist: string;
    charter: string;
    duration: string; // In minutes:seconds
    album: string;
    bpm: string;
    song_artist: string;
    song_difficulties: [string, number, string][]; // Array of tuples [Difficulty Name, Difficulty Level, Difficulty Release Date]
    song_release_date: string;
}

const results: SongData[] = [
    {
        title: "XyHATTE",
        jacket: "XyHATTE_GRV",
        jacket_artist: "球Q - 結! - 玄武-",
        charter: "cosMo@BousouP",
        duration: "2:01",
        album: "For UltraPlayers (2015)",
        bpm: "222",
        song_artist: "cosMo＠暴走Ultimate",
        song_difficulties: [["NOVICE", 6, "1/1/1969"], ["ADVANCED", 12, "1/1/1969"], ["EXHAUST", 18, "1/1/1969"], ["GRAVITY", 19, "1/1/1969"]],
        song_release_date: ""
    },
    {
        title: "Lachryma(Re:Queen'M)",
        jacket: "Lachryma(Re_Queen'M)_GRV",
        jacket_artist: "第十のセフィラ - 亡国のGRACE ‡ 蒼弐 Michael",
        charter: "Chiharu Kaneko",
        duration: "2:01",
        album: "",
        bpm: "236",
        song_artist: "かねこちはる",
        song_difficulties: [["NOVICE", 8, "1/1/1969"], ["ADVANCED", 15, "1/1/1969"], ["EXHAUST", 18, "1/1/1969"], ["GRAVITY", 20, "1/1/1969"]],
        song_release_date: ""
    },
    {
        title: "XyHATTE",
        jacket: "XyHATTE_GRV",
        jacket_artist: "球Q - 結! - 玄武-",
        charter: "cosMo@BousouP",
        duration: "2:01",
        album: "For UltraPlayers (2015)",
        bpm: "222",
        song_artist: "cosMo＠暴走Ultimate",
        song_difficulties: [["NOVICE", 6, "1/1/1969"], ["ADVANCED", 12, "1/1/1969"], ["EXHAUST", 18, "1/1/1969"], ["GRAVITY", 19, "1/1/1969"]],
        song_release_date: ""
    },
    {
        title: "XyHATTE",
        jacket: "XyHATTE_GRV",
        jacket_artist: "球Q - 結! - 玄武-",
        charter: "cosMo@BousouP",
        duration: "2:01",
        album: "For UltraPlayers (2015)",
        bpm: "222",
        song_artist: "cosMo＠暴走Ultimate",
        song_difficulties: [["NOVICE", 6, "1/1/1969"], ["ADVANCED", 12, "1/1/1969"], ["EXHAUST", 18, "1/1/1969"], ["GRAVITY", 19, "1/1/1969"]],
        song_release_date: ""
    },
    {
        title: "XyHATTE",
        jacket: "XyHATTE_GRV",
        jacket_artist: "球Q - 結! - 玄武-",
        charter: "cosMo@BousouP",
        duration: "2:01",
        album: "For UltraPlayers (2015)",
        bpm: "222",
        song_artist: "cosMo＠暴走Ultimate",
        song_difficulties: [["NOVICE", 6, "1/1/1969"], ["ADVANCED", 12, "1/1/1969"], ["EXHAUST", 18, "1/1/1969"], ["GRAVITY", 19, "1/1/1969"]],
        song_release_date: ""
    },
    {
        title: "XyHATTE",
        jacket: "XyHATTE_GRV",
        jacket_artist: "球Q - 結! - 玄武-",
        charter: "cosMo@BousouP",
        duration: "2:01",
        album: "For UltraPlayers (2015)",
        bpm: "222",
        song_artist: "cosMo＠暴走Ultimate",
        song_difficulties: [["NOVICE", 6, "1/1/1969"], ["ADVANCED", 12, "1/1/1969"], ["EXHAUST", 18, "1/1/1969"], ["GRAVITY", 19, "1/1/1969"]],
        song_release_date: ""
    }

]

const search_field = ref('')
let active_search = false

watch(search_field, (value) => {
    if(value.length > 0) {
        active_search = true
        search(value)
    }
})

const search = debounce((input:string) => {
    console.log("Execute search using: " + input)
}, 500)
</script>

<template>
    <body id='body_layout' class="relative h-screen bg-gray-900 overflow-hidden">
        <header>
            <div id="header_container" class="bg-headerbg">
                <div class="m-auto w-min">
                </div>
            </div>
        </header>

        <main>
            <video id="video_background" class="absolute brightness-10 min-w-[1300px] w-screen z-0 object-fill min-h-screen max-h-screen" oncontextmenu="return false;" autoplay loop muted>
                    <source src="../assets/homepage_cmp_15.mp4" type="video/mp4"/>
                    Your browser does not support the video tag.
            </video>

            <div id="background_container" class="relative flex shadow-inner border min-h-screen">
                <div id="search_container" :class="(active_search)?'z-10 max-w-xs border':'z-10 m-auto border'">
                    <img class="w-1/12 h-1/12 m-auto pt-3" src="../assets/pixel_grace.png" alt=":)">
                    <div class="text-white text-3xl text-center pt-2 pb-8">Sound Voltex Library</div>
                    <form>
                        <input v-model="search_field" class="text-center block m-auto py-2.5 px-0 w-1/2 text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" onkeypress="return event.keyCode != 13;" autocomplete="off" type="text" autofocus id="home_search" placeholder="Song Name">
                    </form>
                    <div class="text-white text-sm pt-10 text-center p-4">Replace special characters with english character equivalents except for Japanese songs</div>
                </div>

                <div id="search_results_container" v-if="active_search" class="max-h-screen w-full border overflow-auto">
                    <div class="border" v-for="result in results">
                        <div id="search_result_cell" class="">

                            <div id="result_cell" class="text-white p-6 flex hover:cursor-pointer">
                                <img class="w-32 h-32 border-purple-900 border" :src="'/' + result.jacket + '.png'" >
                                <div class="ml-5 border">
                                    <div class="font-thin font-sans text-6xl border w-fit">{{ result.title }}</div>
                                    <div class="h-fit border flex flex-row flex-shrink-0 mt-5 w-fit">
                                        <div class="m-3" v-for="diff in result.song_difficulties">{{diff[0]}} {{ diff[1] }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </body>
</template>


<style>
.search-enter-active {

}
</style>