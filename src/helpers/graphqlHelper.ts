import { useQuery } from "@vue/apollo-composable"
import gql from "graphql-tag"

enum QUERY_SETTINGS {
    REQUEST_LIMIT = parseInt(import.meta.env.VITE_GRAPHQL_REQUEST_LIMIT)
}

let variables = {
    title: ''
}

const allSongsQuery = gql`
    query ($cursor: String!, $first: Int!) {
        songs (all: "a", first: $first, after: $cursor) {
            pageInfo {
                startCursor
                endCursor
                hasNextPage
            }
            totalCount
            edges {
                cursor
                node {
                    id
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
                    bannerFilename
                }
            }
        }
    }
`

const songQuery = gql`
    query ($title: String!, $cursor: String!, $first: Int!) {
        songs (q: $title, first: $first, after: $cursor) {
            pageInfo {
                startCursor
                endCursor
                hasNextPage
            }
            totalCount
            edges {
                cursor
                node {
                    id
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
                    bannerFilename
                }
            }
        }
    }
`

const chartQuery = gql`
    query ($songTitle: ID!) {
        charts (songTitle: $songTitle) {
            edges {
                node {
                    songTitle {
                        title
                    }
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
        }
    }
`


export function runAllSongsQuery(cursor="") {
    variables = {
        cursor: cursor,
        first: QUERY_SETTINGS.REQUEST_LIMIT
    }
    const { result, loading, error } = useQuery(allSongsQuery, variables, { fetchPolicy: 'network-only' })

    return { result, loading, error }
}

export function runSearchSongsQuery(searchTerm: string, cursor="") {
    variables = {
        title: searchTerm,
        cursor: cursor,
        first: QUERY_SETTINGS.REQUEST_LIMIT
    }
    const { result, loading, error } = useQuery(songQuery, variables, { fetchPolicy: 'network-only' })
    return { result, loading, error }
}

export function runChartQuery(value: string) {
    variables = {
        songTitle: value,
    }
    const { result, loading, error } = useQuery(chartQuery, variables, { fetchPolicy: 'network-only' })
    return { result, loading, error }
}