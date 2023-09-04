<script setup lang="ts">
import { ref, computed } from 'vue' 

function getDiffBackground(diff:string) : string {
    // Using class binding does not seem to register custom tailwind extensions, so I am opting for this method
    switch(diff) {
        case "NOVICE":
            return "bg-[url('/novice_diff_label_bg.png')]"
        case "ADVANCED":
            return "bg-[url('/adv_diff_label_bg.png')]"
        case "EXHAUST":
            return "bg-[url('/exh_diff_label_bg.png')]"
        case "HEAVENLY":
            return "bg-[url('/hvn_diff_label_bg.png')]"
        case "INFINITE":
            return "bg-[url('/inf_diff_label_bg.png')]"
        case "GRAVITY":
            return "bg-[url('/grv_diff_label_bg.png')]"
        case "VIVID":
            return "bg-[url('/vvd_diff_label_bg.png')]"
        case "MAXIMUM":
            return "bg-[url('max_diff_label_bg.png')]"
        case "EXCEED":
            return "bg-[url('xcd_diff_label_bg.png')]"
        default:
            console.log("Invalid difficulty: " + diff)
            return ""
    }
}

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
        title: "赫焉のヴァルキュリア -Ragnarøk-",
        jacket: "Kakuen_no_valkyria_-Ragnarok-",
        jacket_artist: "アユタ",
        charter: "ryhki",
        duration: "2:00",
        album: "",
        bpm: "222",
        song_artist: "ryhki",
        song_difficulties: [["NOVICE", 7, "1/1/1969"], ["ADVANCED", 14, "1/1/1969"], ["EXHAUST", 17, "1/1/1969"], ["MAXIMUM", 19, "1/1/1969"]],
        song_release_date: ""
    },
    {
        title: "打打打打打打打打打打",
        jacket: "XyHATTE_GRV",
        jacket_artist: "球Q - 結! - 玄武-",
        charter: "cosMo@BousouP",
        duration: "2:01",
        album: "For UltraPlayers (2015)",
        bpm: "222",
        song_artist: "cosMo＠暴走Ultimate",
        song_difficulties: [["NOVICE", 6, "1/1/1969"], ["INFINITE", 12, "1/1/1969"], ["VIVID", 18, "1/1/1969"], ["HEAVENLY", 19, "1/1/1969"]],
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

</script>

<template>
    <div class="max-h-screen overflow-auto">
        <div class="border" v-for="result in results">
            <div id="search_result_cell">
                <div id="result_cell" class="text-white p-6 flex hover:cursor-pointer">
                    <div class="min-h-full min-w-fit flex items-center">
                        <img class="w-32 h-32" :src="'/' + result.jacket + '.png'" >
                    </div>

                    <div class="ml-5">
                        <div class="font-thin font-sans text-5xl sm:w-64 xl:w-128">{{ result.title }}</div>
                        <div class="bg-gray-950 w-36 flex-col shadow-inner shadow-indigo-800 rounded-lg flex xl:flex-row xl:w-fit mt-10 max-w-lg justify-between">
                            <div class="m-2 bg-center bg-no-repeat text-center min-w-fit" :class=getDiffBackground(difficulty[0]) v-for="difficulty in result.song_difficulties">
                                <p class="ml-2 mr-2 font-semibold">{{difficulty[0]}} {{difficulty[1]}} </p>
                            </div>
                        </div>
                    </div>

                    <div class="text-xl min-w-fit leading-loose text-left flex flex-col justify-center items-center">
                        <p>Artist - {{ result.song_artist }}</p>
                        <p>BPM - {{ result.bpm }}</p>
                        <p>Song Length - {{ result.duration }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>