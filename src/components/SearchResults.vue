<script setup lang="ts">
import { ref } from 'vue'
import type { AdvancedSongDataInterface, BasicSongDataInterface, SongDifficulty } from '../utils/SongData.interface.ts'
import SongDetailsBar from './SongDetailsBar.vue';

const results = ref<AdvancedSongDataInterface[]>([]);

function addSong(title:string, jacket:string, jacket_artist:string, charter:string, duration:string, album:string, bpm:string, song_artist:string, song_difficulties:SongDifficulty[], song_release_date:string) {
    const new_entry: AdvancedSongDataInterface = {
        title: title,
        jacket: jacket,
        charter: charter,
        duration: duration,
        album: album,
        bpm: bpm,
        song_artist: song_artist,
        song_difficulties: song_difficulties,
        song_release_date: song_release_date
    }

    results.value.push(new_entry)
}

function removeSong() {
    results.value.pop()
}

function getDiffBackground(diff:string) : string {
    // Using class binding does not seem to register custom tailwind extensions on bg, so I am opting for this method for now
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
            throw new Error("Returned invalid difficulty of " + diff)
    }
}

results.value = [{
        title: "XyHATTE",
        jacket: "XyHATTE_GRV",
        jacket_artist: "球Q - 結! - 玄武-",
        charter: "cosMo@BousouP",
        duration: "2:01",
        album: "For UltraPlayers (2015)",
        bpm: "222",
        song_artist: "cosMo＠暴走Ultimate",
        song_difficulties: [
            <SongDifficulty>{difficulty_name:"NOVICE", difficulty_level:6, difficulty_release_date:"8/21/2015", rank_tier: "B", max_chain: 861, max_chip_notes: 976, max_long_notes: 468, max_vol_notes:1197, song_effect_radar_notes:10, song_effect_radar_peak:10, song_effect_radar_handtrip:10, song_effect_radar_onehanded:100, song_effect_radar_tricky:10, song_effect_radar_tsumami:60},
            <SongDifficulty>{difficulty_name:"ADVANCED", difficulty_level:12, difficulty_release_date:"8/21/2015", rank_tier: "A+",max_chain: 1361, max_chip_notes: 976, max_long_notes: 468, max_vol_notes:1197, song_effect_radar_notes:25, song_effect_radar_peak:25, song_effect_radar_handtrip:25, song_effect_radar_onehanded:100, song_effect_radar_tricky:25, song_effect_radar_tsumami:60}, 
            <SongDifficulty>{difficulty_name:"EXHAUST", difficulty_level:18, difficulty_release_date:"8/21/2015", rank_tier: "S",max_chain: 2073, max_chip_notes: 915, max_long_notes: 362, max_vol_notes:878, song_effect_radar_notes:50, song_effect_radar_peak:50, song_effect_radar_handtrip:50, song_effect_radar_onehanded:100, song_effect_radar_tricky:50, song_effect_radar_tsumami:60},
            <SongDifficulty>{difficulty_name:"GRAVITY", difficulty_level:19, difficulty_release_date:"8/21/2015", rank_tier: "SS",max_chain: 2641, max_chip_notes: 976, max_long_notes: 468, max_vol_notes:1197, song_effect_radar_notes:100, song_effect_radar_peak:100, song_effect_radar_handtrip:100, song_effect_radar_onehanded:100, song_effect_radar_tricky:100, song_effect_radar_tsumami:60}
            ],
        song_release_date: "August 21, 2015",
        expanded: false
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
        song_difficulties: [
            <SongDifficulty>{difficulty_name:"NOVICE", difficulty_level:8, difficulty_release_date:"1/1/1969", rank_tier: "S"}, 
            <SongDifficulty>{difficulty_name:"ADVANCED", difficulty_level:15, difficulty_release_date:"1/1/1969", rank_tier: ""}, 
            <SongDifficulty>{difficulty_name:"EXHAUST", difficulty_level:18, difficulty_release_date:"1/1/1969", rank_tier: ""}, 
            <SongDifficulty>{difficulty_name:"HEAVENLY", difficulty_level:20, difficulty_release_date:"1/1/1969", rank_tier: ""}
            ],
        song_release_date: "",
        expanded: false
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
        song_difficulties: [
            <SongDifficulty>{difficulty_name:"NOVICE", difficulty_level:7, difficulty_release_date:"1/1/1969", rank_tier: "D"}, 
            <SongDifficulty>{difficulty_name:"ADVANCED", difficulty_level:14, difficulty_release_date:"1/1/1969"}, 
            <SongDifficulty>{difficulty_name:"EXHAUST", difficulty_level:17, difficulty_release_date:"1/1/1969"},
            <SongDifficulty>{difficulty_name:"MAXIMUM", difficulty_level:19, difficulty_release_date:"1/1/1969"}
            ],
        song_release_date: "",
        expanded: false
    }
]
</script>

<template>
    <div class="max-h-screen text-white overflow-auto">
        <div class="border" v-for="result in results">
            <div id="search_result_cell" @click="result.expanded = !result.expanded">
                <div id="result_cell" class="p-6 flex hover:cursor-pointer">
                    <div class="min-h-full min-w-fit flex items-center">
                        <img class="w-32 h-32" :src="'/' + result.jacket + '.png'" >
                    </div>

                    <div class="ml-5">
                        <div class="font-thin font-sans text-5xl sm:w-64 xl:w-128">{{ result.title }}</div>
                        <div class="bg-gray-950 w-36 flex-col border-slate-500 border-2 rounded-lg flex xl:flex-row xl:w-fit mt-10 max-w-lg justify-between">
                            <div class="m-2 bg-center bg-no-repeat text-center min-w-fit" :class=getDiffBackground(difficulty.difficulty_name) v-for="difficulty in result.song_difficulties">
                                <p class="mx-2 font-semibold">{{difficulty.difficulty_name}} {{difficulty.difficulty_level}} </p>
                            </div>
                        </div>
                    </div>

                    <div class="text-xl min-w-fit leading-loose text-left flex flex-col justify-center">
                        <p>Artist - {{ result.song_artist }}</p>
                        <p>BPM - {{ result.bpm }}</p>
                        <p>Song Length - {{ result.duration }}</p>
                    </div>
                </div>
            </div>
            <div id="search_result_expanded_details" v-if="result.expanded">
                <SongDetailsBar :song_info="result"/>
            </div>
        </div>
        <div class="min-w-fit min-h-fit border" @click="addSong('My Hottest Mixtape', 'kazu ofc', 'some guy in tokyo', 'some guy not in tokyo', '6:42', 'none', '999', 'Me', [], '01/01/2001')">
                ADD NEW SONG
        </div>
        <div class="min-w-fit min-h-fit border" @click="removeSong()">
                REMOVE SONG
        </div>
    </div>
</template>