import type { AdvancedSongDataInterface, SongDifficulty } from "@/utils/SongData.interface"

export function mapSongResponseToSongData(song, diffs) {
    return {
        title: song.title,
        effector: song.effector,
        duration: song.duration,
        album: song.album,
        bpm: song.bpm,
        song_artist: song.artist,
        song_difficulties: diffs,
        song_release_date: song.releaseDate,
        konasute_unlock_method: song.konasuteUnlockMethod,
        konasute_vol_pack: song.konasuteVolumePack,
        expanded: false
    } as AdvancedSongDataInterface
}

export function mapChartResponseToDifficulties(chart) {
    return {
        difficulty_name: chart.difficultyName,
        difficulty_level: chart.level,
        difficulty_release_date: chart.releaseDate,
        rank_tier: chart.tier,
        isArcade: chart.diffIsArcade,
        isKonasute: chart.diffIsKonasute,
        jacket: chart.jacketFilename,
        jacket_artist: chart.jacketArtist,
        max_chain: chart.maxChain,
        max_chip_notes: chart.maxChipNotes,
        max_long_notes: chart.maxLongNotes,
        max_vol_notes: chart.maxVolNotes,
        song_effect_radar_notes: chart.radarNotes,
        song_effect_radar_peak: chart.radarPeak,
        song_effect_radar_tsumami: chart.radarTsumami,
        song_effect_radar_onehanded: chart.radarOnehanded,
        song_effect_radar_handtrip: chart.radarHandtrip,
        song_effect_radar_tricky: chart.radarTricky
    } as SongDifficulty
}
