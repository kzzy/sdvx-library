export interface SearchFilterInterface {
    game_entry: string;
    level_range_min: number | null;
    level_range_max: number | null;
    bpm_range_min: number | null;
    bpm_range_max: number | null;
    isArcade: boolean;
    isKonasute: boolean;
    konasute_vol_pack: number | null;
}