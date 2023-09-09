export interface ChartMaxNotesDescription {
    max_chain?: number;
    max_chip_notes?: number;
    max_long_notes?: number;
    max_vol_notes?: number
}

export interface ChartEffectDescription {
    song_effect_radar_notes?: number;
    song_effect_radar_peak?: number;
    song_effect_radar_tsumami?: number;
    song_effect_radar_onehanded?: number;
    song_effect_radar_handtrip?: number;
    song_effect_radar_tricky?: number;
}

export interface SongDifficulty extends ChartMaxNotesDescription, ChartEffectDescription{
    difficulty_name: string;
    difficulty_level: number;
    difficulty_release_date: string;
}

export interface BasicSongDataInterface {
    title: string;
    jacket: string;
    duration: string;
    bpm: string;
    song_artist: string;
    song_difficulties: SongDifficulty[];

    expanded: boolean;
}

export interface AdvancedSongDataInterface extends BasicSongDataInterface {
    jacket_artist: string;
    charter: string;
    album: string;

    isKonasute?: boolean;
    konasute_vol_pack?: number;

    konasute_unlock_method?: string;
    arcade_unlock_method?: string;

    song_release_date: string;
}