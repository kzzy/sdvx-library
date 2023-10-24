import { useQuery } from "@vue/apollo-composable"
import gql from "graphql-tag"

let variables = {
    title: ''
}

const songQuery = gql`
    query ($title: String!) {
        songsLikeName (title: $title) {
            title
            duration
            bpm
            artist
            effector
            album
            isArcade
            isKonasute
            konasuteVolumePack
            releaseDate
            konasuteUnlockMethod
            arcadeUnlockMethod
        }
    }
`
const chartQuery = gql`
    query ($songTitle: String!) {
        chartsByName (songTitle: $songTitle) {
            difficultyName
            level
            jacketFilename
            jacketArtist
            diffIsArcade
            diffIsKonasute
            releaseDate
            tier
            maxChain
            maxChipNotes
            maxLongNotes
            maxVolNotes
            radarHandtrip
            radarNotes
            radarOnehanded
            radarPeak
            radarTricky
            radarTsumami
        }
    }
`


export function runSongQuery(value: string) {
    variables = {
        title:value,
    }
    const { result } = useQuery(songQuery, variables, { fetchPolicy: 'network-only' })
    return result
}

export function runChartQuery(value: string) {
    variables = {
        songTitle:value,
    }
    const { result } = useQuery(chartQuery, variables, { fetchPolicy: 'network-only' })
    return result
}