import { useQuery } from "@vue/apollo-composable"
import gql from "graphql-tag"

const query = gql`
    query {
        songResults {
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

export function buildQuery() {
    const { result } = useQuery(query)
    console.log(result)
}