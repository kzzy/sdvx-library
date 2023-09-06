export interface BasicSongDataInterface {
    title: string;
    jacket: string;
    duration: string; // In minutes:seconds
    bpm: string;
    song_artist: string;
    song_difficulties: [string, number, string][]; // Array of tuples [Difficulty Name, Difficulty Level, Difficulty Release Date]

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

    song_max_chain?: string;
    song_max_chip_notes?: string;
    song_max_long_notes?: string;
    song_max_vol_notes?: string;

    song_effect_radar_notes?: string;
    song_effect_radar_peak?: string;
    song_effect_radar_tsumami?: string;
    song_effect_radar_onehanded?: string;
    song_effect_radar_handtrip?: string;
    song_effect_radar_tricky?: string;
}