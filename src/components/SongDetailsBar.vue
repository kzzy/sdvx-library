<script lang="ts">
import { ref } from 'vue'
const selected = ref("general")

export default {
    name: 'SongDetailsBar',
    props: {
      song_info: {
        title: String,
        jacket: String,
        jacket_artist: String,
        charter: String,
        duration: String, // In minutes:seconds
        album: String,
        bpm: String,

        isKonasute: Boolean,
        konasute_vol_pack: Number,

        konasute_unlock_method: String,
        arcade_unlock_method: String,

        song_artist: String,
        song_difficulties: [String, Number, String], // Array of tuples [Difficulty Name, Difficulty Level, Difficulty Release Date]
        song_release_date: String,

        song_max_chain: String,
        song_max_chip_notes: String,
        song_max_long_notes: String,
        song_max_vol_notes: String,

        song_effect_radar_notes: String,
        song_effect_radar_peak: String,
        song_effect_radar_tsumami: String,
        song_effect_radar_onehanded: String,
        song_effect_radar_handtrip: String,
        song_effect_radar_tricky: String
      }
    }, 

    // Need to access via props.xxx to retain reactivity, but our data does not need to maintain that capability
    setup(props) {
        console.log(props.song_info.title)
    }
}

</script>
<template>
    <header class="">
      <nav>
        <ul class="flex justify-center text-xl">
          <li class="hover:text-gray-500 cursor-pointer px-4">
            <div>General Details</div>
          </li>
          <li class="hover:text-gray-500 cursor-pointer px-4">
            <div>Unlocking</div>
          </li>
          <li class="hover:text-gray-500 cursor-pointer px-4">
            <div>History</div>
          </li>
        </ul>
      </nav>
    </header>
</template>