import { useQuery } from "@vue/apollo-composable"
import gql from "graphql-tag"

let variables = {
    title: ''
}

const allSongsQuery = gql`
    query {
        songs {
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
export function runAllSongsQuery() {
    const { result, loading, error } = useQuery(allSongsQuery, {}, { fetchPolicy: 'network-only' })
    return { result, loading, error }
}

export function runSearchSongsQuery(value: string) {
    variables = {
        title:value,
    }
    const { result, loading, error } = useQuery(songQuery, variables, { fetchPolicy: 'network-only' })
    return { result, loading, error }
}

export function runChartQuery(value: string) {
    variables = {
        songTitle:value,
    }
    const { result, loading, error } = useQuery(chartQuery, variables, { fetchPolicy: 'network-only' })
    return { result, loading, error }
}