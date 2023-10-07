<script setup lang="ts">
import { ref } from 'vue'
import type { AdvancedSongDataInterface, SongDifficulty } from '../utils/SongData.interface.ts'
import SongDetailsBar from './SongDetailsBar.vue';

const results = ref<AdvancedSongDataInterface[]>([]);

function addSong(title:string, effector:string, duration:string, album:string, bpm:string, song_artist:string, song_difficulties:SongDifficulty[], song_release_date:string) {
    const new_entry: AdvancedSongDataInterface = {
        title: title,
        effector: effector,
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

results.value = [
    {
        title: "Lachryma(Re:Queen'M)",
        effector: "PHQUASE lūcifer",
        duration: "2:01",
        album: "",
        bpm: "236",
        song_artist: "かねこちはる",
        song_difficulties: [
            <SongDifficulty>{difficulty_name:"NOVICE", difficulty_level:8, difficulty_release_date:"1/1/1969", isArcade: false, isKonasute: true, jacket:"Lachryma(Re_Queen'M)_NVC", jacket_artist:"第十のセフィラ - 亡国のGRACE ‡ 蒼弐 Michael", rank_tier: "", max_chain: 861, max_chip_notes: 976, max_long_notes: 468, max_vol_notes:1197, song_effect_radar_notes:63, song_effect_radar_peak:77, song_effect_radar_handtrip:10, song_effect_radar_onehanded:25, song_effect_radar_tricky:20, song_effect_radar_tsumami:45}, 
            <SongDifficulty>{difficulty_name:"ADVANCED", difficulty_level:13, difficulty_release_date:"1/1/1969", isArcade: true, isKonasute: true, jacket:"Lachryma(Re_Queen'M)_ADV", jacket_artist:"第十のセフィラ - 亡国のGRACE ‡ 蒼弐 Michael", rank_tier: "", max_chain: 861, max_chip_notes: 976, max_long_notes: 468, max_vol_notes:1197}, 
            <SongDifficulty>{difficulty_name:"EXHAUST", difficulty_level:18, difficulty_release_date:"1/1/1969", isArcade: true, isKonasute: false, jacket:"Lachryma(Re_Queen'M)_EXH", jacket_artist:"第十のセフィラ - 亡国のGRACE ‡ 蒼弐 Michael", rank_tier: "C", max_chain: 861, max_chip_notes: 976, max_long_notes: 468, max_vol_notes:1197, song_effect_radar_notes:125, song_effect_radar_peak:125, song_effect_radar_handtrip:23, song_effect_radar_onehanded:75, song_effect_radar_tricky:20, song_effect_radar_tsumami:33}, 
            <SongDifficulty>{difficulty_name:"GRAVITY", difficulty_level:20, difficulty_release_date:"1/1/1969", isArcade: true, isKonasute: true, jacket:"Lachryma(Re_Queen'M)_GRV", jacket_artist:"第十のセフィラ - 亡国のGRACE ‡ 蒼弐 Michael", rank_tier: "B", max_chain: 861, max_chip_notes: 976, max_long_notes: 468, max_vol_notes:1197, song_effect_radar_notes:125, song_effect_radar_peak:125, song_effect_radar_handtrip:33, song_effect_radar_onehanded:100, song_effect_radar_tricky:48, song_effect_radar_tsumami:51}
            ],
        song_release_date: "September 7, 2016",
        konasute_unlock_method: "VolumePack",
        konasute_vol_pack: 6,
        expanded: false
    },
    {
        title: "XyHATTE",
        effector: "cosMo@BousouP",
        duration: "2:01",
        album: "For UltraPlayers (2015)",
        bpm: "222",
        song_artist: "cosMo＠暴走Ultimate",
        song_difficulties: [
            <SongDifficulty>{difficulty_name:"NOVICE", difficulty_level:6, difficulty_release_date:"8/21/2015", isArcade: true, isKonasute: false, jacket: "XyHATTE_NVC", jacket_artist: "球Q - 結! - 玄武-", rank_tier: "B", max_chain: 861, max_chip_notes: 976, max_long_notes: 468, max_vol_notes:1197, song_effect_radar_notes:10, song_effect_radar_peak:10, song_effect_radar_handtrip:10, song_effect_radar_onehanded:100, song_effect_radar_tricky:10, song_effect_radar_tsumami:60},
            <SongDifficulty>{difficulty_name:"ADVANCED", difficulty_level:12, difficulty_release_date:"8/21/2015", isArcade: true, isKonasute: false, jacket: "XyHATTE_ADV", jacket_artist: "球Q - 結! - 玄武-", rank_tier: "A+",max_chain: 1361, max_chip_notes: 976, max_long_notes: 468, max_vol_notes:1197, song_effect_radar_notes:25, song_effect_radar_peak:25, song_effect_radar_handtrip:25, song_effect_radar_onehanded:100, song_effect_radar_tricky:25, song_effect_radar_tsumami:60}, 
            <SongDifficulty>{difficulty_name:"EXHAUST", difficulty_level:18, difficulty_release_date:"8/21/2015", isArcade: true, isKonasute: false, jacket: "XyHATTE_EXH", jacket_artist: "球Q - 結! - 玄武-", rank_tier: "S",max_chain: 2073, max_chip_notes: 915, max_long_notes: 362, max_vol_notes:878, song_effect_radar_notes:50, song_effect_radar_peak:50, song_effect_radar_handtrip:50, song_effect_radar_onehanded:100, song_effect_radar_tricky:50, song_effect_radar_tsumami:60},
            <SongDifficulty>{difficulty_name:"GRAVITY", difficulty_level:19, difficulty_release_date:"8/21/2015", isArcade: true, isKonasute: false, jacket: "XyHATTE_GRV", jacket_artist: "球Q - 結! - 玄武-", rank_tier: "SS",max_chain: 2641, max_chip_notes: 976, max_long_notes: 468, max_vol_notes:1197, song_effect_radar_notes:100, song_effect_radar_peak:100, song_effect_radar_handtrip:100, song_effect_radar_onehanded:100, song_effect_radar_tricky:100, song_effect_radar_tsumami:60}
            ],
        song_release_date: "August 21, 2015",
        expanded: false
    },
    {
        title: "赫焉のヴァルキュリア -Ragnarøk-",
        effector: "ryhki",
        duration: "2:00",
        album: "",
        bpm: "222",
        song_artist: "ryhki",
        song_difficulties: [
            <SongDifficulty>{difficulty_name:"NOVICE", difficulty_level:7, difficulty_release_date:"1/1/1969", rank_tier: "D", jacket:"Kakuen_no_valkyria_-Ragnarok-"}, 
            <SongDifficulty>{difficulty_name:"ADVANCED", difficulty_level:14, difficulty_release_date:"1/1/1969", jacket:"Kakuen_no_valkyria_-Ragnarok-"}, 
            <SongDifficulty>{difficulty_name:"EXHAUST", difficulty_level:17, difficulty_release_date:"1/1/1969", jacket:"Kakuen_no_valkyria_-Ragnarok-"},
            <SongDifficulty>{difficulty_name:"MAXIMUM", difficulty_level:19, difficulty_release_date:"1/1/1969", jacket:"Kakuen_no_valkyria_-Ragnarok-"}
            ],
        song_release_date: "",
        expanded: false
    },
    {
        title: "XyHATTE",
        effector: "cosMo@BousouP",
        duration: "2:01",
        album: "For UltraPlayers (2015)",
        bpm: "222",
        song_artist: "cosMo＠暴走Ultimate",
        song_difficulties: [
            <SongDifficulty>{difficulty_name:"NOVICE", difficulty_level:6, difficulty_release_date:"8/21/2015", isKonasute: false, jacket: "XyHATTE_NVC", jacket_artist: "球Q - 結! - 玄武-", rank_tier: "B", max_chain: 861, max_chip_notes: 976, max_long_notes: 468, max_vol_notes:1197, song_effect_radar_notes:10, song_effect_radar_peak:10, song_effect_radar_handtrip:10, song_effect_radar_onehanded:100, song_effect_radar_tricky:10, song_effect_radar_tsumami:60},
            <SongDifficulty>{difficulty_name:"ADVANCED", difficulty_level:12, difficulty_release_date:"8/21/2015", isKonasute: false, jacket: "XyHATTE_ADV", jacket_artist: "球Q - 結! - 玄武-", rank_tier: "A+",max_chain: 1361, max_chip_notes: 976, max_long_notes: 468, max_vol_notes:1197, song_effect_radar_notes:25, song_effect_radar_peak:25, song_effect_radar_handtrip:25, song_effect_radar_onehanded:100, song_effect_radar_tricky:25, song_effect_radar_tsumami:60}, 
            <SongDifficulty>{difficulty_name:"EXHAUST", difficulty_level:18, difficulty_release_date:"8/21/2015", isKonasute: false, jacket: "XyHATTE_EXH", jacket_artist: "球Q - 結! - 玄武-", rank_tier: "S",max_chain: 2073, max_chip_notes: 915, max_long_notes: 362, max_vol_notes:878, song_effect_radar_notes:50, song_effect_radar_peak:50, song_effect_radar_handtrip:50, song_effect_radar_onehanded:100, song_effect_radar_tricky:50, song_effect_radar_tsumami:60},
            <SongDifficulty>{difficulty_name:"GRAVITY", difficulty_level:19, difficulty_release_date:"8/21/2015", isKonasute: false, jacket: "XyHATTE_GRV", jacket_artist: "球Q - 結! - 玄武-", rank_tier: "SS",max_chain: 2641, max_chip_notes: 976, max_long_notes: 468, max_vol_notes:1197, song_effect_radar_notes:100, song_effect_radar_peak:100, song_effect_radar_handtrip:100, song_effect_radar_onehanded:100, song_effect_radar_tricky:100, song_effect_radar_tsumami:60}
            ],
        song_release_date: "August 21, 2015",
        expanded: false
    },
    {
        title: "XyHATTE",
        effector: "cosMo@BousouP",
        duration: "2:01",
        album: "For UltraPlayers (2015)",
        bpm: "222",
        song_artist: "cosMo＠暴走Ultimate",
        song_difficulties: [
            <SongDifficulty>{difficulty_name:"NOVICE", difficulty_level:6, difficulty_release_date:"8/21/2015", isKonasute: false, jacket: "XyHATTE_NVC", jacket_artist: "球Q - 結! - 玄武-", rank_tier: "B", max_chain: 861, max_chip_notes: 976, max_long_notes: 468, max_vol_notes:1197, song_effect_radar_notes:10, song_effect_radar_peak:10, song_effect_radar_handtrip:10, song_effect_radar_onehanded:100, song_effect_radar_tricky:10, song_effect_radar_tsumami:60},
            <SongDifficulty>{difficulty_name:"ADVANCED", difficulty_level:12, difficulty_release_date:"8/21/2015", isKonasute: false, jacket: "XyHATTE_ADV", jacket_artist: "球Q - 結! - 玄武-", rank_tier: "A+",max_chain: 1361, max_chip_notes: 976, max_long_notes: 468, max_vol_notes:1197, song_effect_radar_notes:25, song_effect_radar_peak:25, song_effect_radar_handtrip:25, song_effect_radar_onehanded:100, song_effect_radar_tricky:25, song_effect_radar_tsumami:60}, 
            <SongDifficulty>{difficulty_name:"EXHAUST", difficulty_level:18, difficulty_release_date:"8/21/2015", isKonasute: false, jacket: "XyHATTE_EXH", jacket_artist: "球Q - 結! - 玄武-", rank_tier: "S",max_chain: 2073, max_chip_notes: 915, max_long_notes: 362, max_vol_notes:878, song_effect_radar_notes:50, song_effect_radar_peak:50, song_effect_radar_handtrip:50, song_effect_radar_onehanded:100, song_effect_radar_tricky:50, song_effect_radar_tsumami:60},
            <SongDifficulty>{difficulty_name:"GRAVITY", difficulty_level:19, difficulty_release_date:"8/21/2015", isKonasute: false, jacket: "XyHATTE_GRV", jacket_artist: "球Q - 結! - 玄武-", rank_tier: "SS",max_chain: 2641, max_chip_notes: 976, max_long_notes: 468, max_vol_notes:1197, song_effect_radar_notes:100, song_effect_radar_peak:100, song_effect_radar_handtrip:100, song_effect_radar_onehanded:100, song_effect_radar_tricky:100, song_effect_radar_tsumami:60}
            ],
        song_release_date: "August 21, 2015",
        expanded: false
    },
    {
        title: "XyHATTE",
        effector: "cosMo@BousouP",
        duration: "2:01",
        album: "For UltraPlayers (2015)",
        bpm: "222",
        song_artist: "cosMo＠暴走Ultimate",
        song_difficulties: [
            <SongDifficulty>{difficulty_name:"NOVICE", difficulty_level:6, difficulty_release_date:"8/21/2015", isKonasute: false, jacket: "XyHATTE_NVC", jacket_artist: "球Q - 結! - 玄武-", rank_tier: "B", max_chain: 861, max_chip_notes: 976, max_long_notes: 468, max_vol_notes:1197, song_effect_radar_notes:10, song_effect_radar_peak:10, song_effect_radar_handtrip:10, song_effect_radar_onehanded:100, song_effect_radar_tricky:10, song_effect_radar_tsumami:60},
            <SongDifficulty>{difficulty_name:"ADVANCED", difficulty_level:12, difficulty_release_date:"8/21/2015", isKonasute: false, jacket: "XyHATTE_ADV", jacket_artist: "球Q - 結! - 玄武-", rank_tier: "A+",max_chain: 1361, max_chip_notes: 976, max_long_notes: 468, max_vol_notes:1197, song_effect_radar_notes:25, song_effect_radar_peak:25, song_effect_radar_handtrip:25, song_effect_radar_onehanded:100, song_effect_radar_tricky:25, song_effect_radar_tsumami:60}, 
            <SongDifficulty>{difficulty_name:"EXHAUST", difficulty_level:18, difficulty_release_date:"8/21/2015", isKonasute: false, jacket: "XyHATTE_EXH", jacket_artist: "球Q - 結! - 玄武-", rank_tier: "S",max_chain: 2073, max_chip_notes: 915, max_long_notes: 362, max_vol_notes:878, song_effect_radar_notes:50, song_effect_radar_peak:50, song_effect_radar_handtrip:50, song_effect_radar_onehanded:100, song_effect_radar_tricky:50, song_effect_radar_tsumami:60},
            <SongDifficulty>{difficulty_name:"GRAVITY", difficulty_level:19, difficulty_release_date:"8/21/2015", isKonasute: false, jacket: "XyHATTE_GRV", jacket_artist: "球Q - 結! - 玄武-", rank_tier: "SS",max_chain: 2641, max_chip_notes: 976, max_long_notes: 468, max_vol_notes:1197, song_effect_radar_notes:100, song_effect_radar_peak:100, song_effect_radar_handtrip:100, song_effect_radar_onehanded:100, song_effect_radar_tricky:100, song_effect_radar_tsumami:60}
            ],
        song_release_date: "August 21, 2015",
        expanded: false
    },
    {
        title: "XyHATTE",
        effector: "cosMo@BousouP",
        duration: "2:01",
        album: "For UltraPlayers (2015)",
        bpm: "222",
        song_artist: "cosMo＠暴走Ultimate",
        song_difficulties: [
            <SongDifficulty>{difficulty_name:"NOVICE", difficulty_level:6, difficulty_release_date:"8/21/2015", isKonasute: false, jacket: "XyHATTE_NVC", jacket_artist: "球Q - 結! - 玄武-", rank_tier: "B", max_chain: 861, max_chip_notes: 976, max_long_notes: 468, max_vol_notes:1197, song_effect_radar_notes:10, song_effect_radar_peak:10, song_effect_radar_handtrip:10, song_effect_radar_onehanded:100, song_effect_radar_tricky:10, song_effect_radar_tsumami:60},
            <SongDifficulty>{difficulty_name:"ADVANCED", difficulty_level:12, difficulty_release_date:"8/21/2015", isKonasute: false, jacket: "XyHATTE_ADV", jacket_artist: "球Q - 結! - 玄武-", rank_tier: "A+",max_chain: 1361, max_chip_notes: 976, max_long_notes: 468, max_vol_notes:1197, song_effect_radar_notes:25, song_effect_radar_peak:25, song_effect_radar_handtrip:25, song_effect_radar_onehanded:100, song_effect_radar_tricky:25, song_effect_radar_tsumami:60}, 
            <SongDifficulty>{difficulty_name:"EXHAUST", difficulty_level:18, difficulty_release_date:"8/21/2015", isKonasute: false, jacket: "XyHATTE_EXH", jacket_artist: "球Q - 結! - 玄武-", rank_tier: "S",max_chain: 2073, max_chip_notes: 915, max_long_notes: 362, max_vol_notes:878, song_effect_radar_notes:50, song_effect_radar_peak:50, song_effect_radar_handtrip:50, song_effect_radar_onehanded:100, song_effect_radar_tricky:50, song_effect_radar_tsumami:60},
            <SongDifficulty>{difficulty_name:"GRAVITY", difficulty_level:19, difficulty_release_date:"8/21/2015", isKonasute: false, jacket: "XyHATTE_GRV", jacket_artist: "球Q - 結! - 玄武-", rank_tier: "SS",max_chain: 2641, max_chip_notes: 976, max_long_notes: 468, max_vol_notes:1197, song_effect_radar_notes:100, song_effect_radar_peak:100, song_effect_radar_handtrip:100, song_effect_radar_onehanded:100, song_effect_radar_tricky:100, song_effect_radar_tsumami:60}
            ],
        song_release_date: "August 21, 2015",
        expanded: false
    },
    {
        title: "XyHATTE",
        effector: "cosMo@BousouP",
        duration: "2:01",
        album: "For UltraPlayers (2015)",
        bpm: "222",
        song_artist: "cosMo＠暴走Ultimate",
        song_difficulties: [
            <SongDifficulty>{difficulty_name:"NOVICE", difficulty_level:6, difficulty_release_date:"8/21/2015", isKonasute: false, jacket: "XyHATTE_NVC", jacket_artist: "球Q - 結! - 玄武-", rank_tier: "B", max_chain: 861, max_chip_notes: 976, max_long_notes: 468, max_vol_notes:1197, song_effect_radar_notes:10, song_effect_radar_peak:10, song_effect_radar_handtrip:10, song_effect_radar_onehanded:100, song_effect_radar_tricky:10, song_effect_radar_tsumami:60},
            <SongDifficulty>{difficulty_name:"ADVANCED", difficulty_level:12, difficulty_release_date:"8/21/2015", isKonasute: false, jacket: "XyHATTE_ADV", jacket_artist: "球Q - 結! - 玄武-", rank_tier: "A+",max_chain: 1361, max_chip_notes: 976, max_long_notes: 468, max_vol_notes:1197, song_effect_radar_notes:25, song_effect_radar_peak:25, song_effect_radar_handtrip:25, song_effect_radar_onehanded:100, song_effect_radar_tricky:25, song_effect_radar_tsumami:60}, 
            <SongDifficulty>{difficulty_name:"EXHAUST", difficulty_level:18, difficulty_release_date:"8/21/2015", isKonasute: false, jacket: "XyHATTE_EXH", jacket_artist: "球Q - 結! - 玄武-", rank_tier: "S",max_chain: 2073, max_chip_notes: 915, max_long_notes: 362, max_vol_notes:878, song_effect_radar_notes:50, song_effect_radar_peak:50, song_effect_radar_handtrip:50, song_effect_radar_onehanded:100, song_effect_radar_tricky:50, song_effect_radar_tsumami:60},
            <SongDifficulty>{difficulty_name:"GRAVITY", difficulty_level:19, difficulty_release_date:"8/21/2015", isKonasute: false, jacket: "XyHATTE_GRV", jacket_artist: "球Q - 結! - 玄武-", rank_tier: "SS",max_chain: 2641, max_chip_notes: 976, max_long_notes: 468, max_vol_notes:1197, song_effect_radar_notes:100, song_effect_radar_peak:100, song_effect_radar_handtrip:100, song_effect_radar_onehanded:100, song_effect_radar_tricky:100, song_effect_radar_tsumami:60}
            ],
        song_release_date: "August 21, 2015",
        expanded: false
    },
    {
        title: "XyHATTE",
        effector: "cosMo@BousouP",
        duration: "2:01",
        album: "For UltraPlayers (2015)",
        bpm: "222",
        song_artist: "cosMo＠暴走Ultimate",
        song_difficulties: [
            <SongDifficulty>{difficulty_name:"NOVICE", difficulty_level:6, difficulty_release_date:"8/21/2015", isKonasute: false, jacket: "XyHATTE_NVC", jacket_artist: "球Q - 結! - 玄武-", rank_tier: "B", max_chain: 861, max_chip_notes: 976, max_long_notes: 468, max_vol_notes:1197, song_effect_radar_notes:10, song_effect_radar_peak:10, song_effect_radar_handtrip:10, song_effect_radar_onehanded:100, song_effect_radar_tricky:10, song_effect_radar_tsumami:60},
            <SongDifficulty>{difficulty_name:"ADVANCED", difficulty_level:12, difficulty_release_date:"8/21/2015", isKonasute: false, jacket: "XyHATTE_ADV", jacket_artist: "球Q - 結! - 玄武-", rank_tier: "A+",max_chain: 1361, max_chip_notes: 976, max_long_notes: 468, max_vol_notes:1197, song_effect_radar_notes:25, song_effect_radar_peak:25, song_effect_radar_handtrip:25, song_effect_radar_onehanded:100, song_effect_radar_tricky:25, song_effect_radar_tsumami:60}, 
            <SongDifficulty>{difficulty_name:"EXHAUST", difficulty_level:18, difficulty_release_date:"8/21/2015", isKonasute: false, jacket: "XyHATTE_EXH", jacket_artist: "球Q - 結! - 玄武-", rank_tier: "S",max_chain: 2073, max_chip_notes: 915, max_long_notes: 362, max_vol_notes:878, song_effect_radar_notes:50, song_effect_radar_peak:50, song_effect_radar_handtrip:50, song_effect_radar_onehanded:100, song_effect_radar_tricky:50, song_effect_radar_tsumami:60},
            <SongDifficulty>{difficulty_name:"GRAVITY", difficulty_level:19, difficulty_release_date:"8/21/2015", isKonasute: false, jacket: "XyHATTE_GRV", jacket_artist: "球Q - 結! - 玄武-", rank_tier: "SS",max_chain: 2641, max_chip_notes: 976, max_long_notes: 468, max_vol_notes:1197, song_effect_radar_notes:100, song_effect_radar_peak:100, song_effect_radar_handtrip:100, song_effect_radar_onehanded:100, song_effect_radar_tricky:100, song_effect_radar_tsumami:60}
            ],
        song_release_date: "August 21, 2015",
        expanded: false
    },
    {
        title: "XyHATTE",
        effector: "cosMo@BousouP",
        duration: "2:01",
        album: "For UltraPlayers (2015)",
        bpm: "222",
        song_artist: "cosMo＠暴走Ultimate",
        song_difficulties: [
            <SongDifficulty>{difficulty_name:"NOVICE", difficulty_level:6, difficulty_release_date:"8/21/2015", isKonasute: false, jacket: "XyHATTE_NVC", jacket_artist: "球Q - 結! - 玄武-", rank_tier: "B", max_chain: 861, max_chip_notes: 976, max_long_notes: 468, max_vol_notes:1197, song_effect_radar_notes:10, song_effect_radar_peak:10, song_effect_radar_handtrip:10, song_effect_radar_onehanded:100, song_effect_radar_tricky:10, song_effect_radar_tsumami:60},
            <SongDifficulty>{difficulty_name:"ADVANCED", difficulty_level:12, difficulty_release_date:"8/21/2015", isKonasute: false, jacket: "XyHATTE_ADV", jacket_artist: "球Q - 結! - 玄武-", rank_tier: "A+",max_chain: 1361, max_chip_notes: 976, max_long_notes: 468, max_vol_notes:1197, song_effect_radar_notes:25, song_effect_radar_peak:25, song_effect_radar_handtrip:25, song_effect_radar_onehanded:100, song_effect_radar_tricky:25, song_effect_radar_tsumami:60}, 
            <SongDifficulty>{difficulty_name:"EXHAUST", difficulty_level:18, difficulty_release_date:"8/21/2015", isKonasute: false, jacket: "XyHATTE_EXH", jacket_artist: "球Q - 結! - 玄武-", rank_tier: "S",max_chain: 2073, max_chip_notes: 915, max_long_notes: 362, max_vol_notes:878, song_effect_radar_notes:50, song_effect_radar_peak:50, song_effect_radar_handtrip:50, song_effect_radar_onehanded:100, song_effect_radar_tricky:50, song_effect_radar_tsumami:60},
            <SongDifficulty>{difficulty_name:"GRAVITY", difficulty_level:19, difficulty_release_date:"8/21/2015", isKonasute: false, jacket: "XyHATTE_GRV", jacket_artist: "球Q - 結! - 玄武-", rank_tier: "SS",max_chain: 2641, max_chip_notes: 976, max_long_notes: 468, max_vol_notes:1197, song_effect_radar_notes:100, song_effect_radar_peak:100, song_effect_radar_handtrip:100, song_effect_radar_onehanded:100, song_effect_radar_tricky:100, song_effect_radar_tsumami:60}
            ],
        song_release_date: "August 21, 2015",
        expanded: false
    },
    {
        title: "XyHATTE",
        effector: "cosMo@BousouP",
        duration: "2:01",
        album: "For UltraPlayers (2015)",
        bpm: "222",
        song_artist: "cosMo＠暴走Ultimate",
        song_difficulties: [
            <SongDifficulty>{difficulty_name:"NOVICE", difficulty_level:6, difficulty_release_date:"8/21/2015", isKonasute: false, jacket: "XyHATTE_NVC", jacket_artist: "球Q - 結! - 玄武-", rank_tier: "B", max_chain: 861, max_chip_notes: 976, max_long_notes: 468, max_vol_notes:1197, song_effect_radar_notes:10, song_effect_radar_peak:10, song_effect_radar_handtrip:10, song_effect_radar_onehanded:100, song_effect_radar_tricky:10, song_effect_radar_tsumami:60},
            <SongDifficulty>{difficulty_name:"ADVANCED", difficulty_level:12, difficulty_release_date:"8/21/2015", isKonasute: false, jacket: "XyHATTE_ADV", jacket_artist: "球Q - 結! - 玄武-", rank_tier: "A+",max_chain: 1361, max_chip_notes: 976, max_long_notes: 468, max_vol_notes:1197, song_effect_radar_notes:25, song_effect_radar_peak:25, song_effect_radar_handtrip:25, song_effect_radar_onehanded:100, song_effect_radar_tricky:25, song_effect_radar_tsumami:60}, 
            <SongDifficulty>{difficulty_name:"EXHAUST", difficulty_level:18, difficulty_release_date:"8/21/2015", isKonasute: false, jacket: "XyHATTE_EXH", jacket_artist: "球Q - 結! - 玄武-", rank_tier: "S",max_chain: 2073, max_chip_notes: 915, max_long_notes: 362, max_vol_notes:878, song_effect_radar_notes:50, song_effect_radar_peak:50, song_effect_radar_handtrip:50, song_effect_radar_onehanded:100, song_effect_radar_tricky:50, song_effect_radar_tsumami:60},
            <SongDifficulty>{difficulty_name:"GRAVITY", difficulty_level:19, difficulty_release_date:"8/21/2015", isKonasute: false, jacket: "XyHATTE_GRV", jacket_artist: "球Q - 結! - 玄武-", rank_tier: "SS",max_chain: 2641, max_chip_notes: 976, max_long_notes: 468, max_vol_notes:1197, song_effect_radar_notes:100, song_effect_radar_peak:100, song_effect_radar_handtrip:100, song_effect_radar_onehanded:100, song_effect_radar_tricky:100, song_effect_radar_tsumami:60}
            ],
        song_release_date: "August 21, 2015",
        expanded: false
    }
]
</script>

<template>
    <div class="max-h-screen text-white overflow-y-scroll border-l-2 border-indigo-900">
        <div class="flex flex-col items-center justify-center">
            <div class="w-4/6 text-6xl font-light">
                <h3 class="pl-6 py-4">Results</h3>
            </div>
            <div class="w-4/6 rounded-2xl mx-5 my-3 shadow-sky-200 shadow-sm overflow-hidden" v-for="result in results">
                <div id="search_result_cell" @click="result.expanded = !result.expanded">
                    <div id="result_cell" class="p-6 flex relative overflow-hidden min-w-fit bg-mainNight hover:cursor-pointer hover:brightness-125">
                        <div class="min-h-full min-w-fit flex items-center">
                            <img class="w-32 h-32" :src="'/' + result.song_difficulties[result.song_difficulties.length-1].jacket + '.png'" >
                        </div>

                        <div class="ml-5 z-10">
                            <div class="@container font-thin font-sans max-w-xl sm:w-64 xl:w-160">
                                <div class="@lg:text-4xl text-3xl">{{ result.title }}</div>
                            </div>
                            <div class="w-36 flex-col flex xl:flex-row xl:w-fit mt-10 max-w-lg justify-between">
                                <div class="m-2 bg-center bg-no-repeat text-center min-w-fit" :class=getDiffBackground(difficulty.difficulty_name) v-for="difficulty in result.song_difficulties">
                                    <p class="mx-2 font-semibold">{{difficulty.difficulty_name}} {{difficulty.difficulty_level}} </p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="absolute -top-2 -right-28 z-0 overflow-hidden visible max-2xl:hidden">
                            <div class="absolute z-10 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-transparent via-70% via-mainNight to-80% to-mainNight"></div>
                            <img class="w-160 h-96 brightness-75" :src="'/' + result.song_difficulties[result.song_difficulties.length-1].jacket + '.png'" >
                        </div>
                    </div>
                </div>
                <SongDetailsBar v-if="result.expanded" :song_info="result"/>
            </div>
        </div>
    </div>
</template>