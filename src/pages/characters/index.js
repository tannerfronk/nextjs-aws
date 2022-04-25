import * as React from 'react'
import Box from '@mui/material/Box'
import CharacterCard from '../../components/characters/CharacterCard'
import { CircularProgress } from '@mui/material';
import useSWR from 'swr';

const CharactersPage = (props) => {
    let [characters, setCharacters] = React.useState([])
    const {user} = props

    const fetcher = async () => {
        fetch(`/api/characters`)
            .then(res => res.json())
            .then(data => {
                setCharacters(data.characters.data.results)
                console.log(data)
            })
    }

    const {error} = useSWR('/api/characters', fetcher)

    if (error) return <div>Failed to load list of movies.</div>

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center'
            }}
        >
            {(!characters || characters.length < 1) &&
                <Box sx={{ margin: 'auto', marginTop: 5 }}>
                    <CircularProgress variant="indeterminate" size='5em' sx={{ color: '#F0131E' }}></CircularProgress>
                    
                </Box>
            }
            {characters && characters.length > 0 &&
                characters.map((character) => {
                    return (
                        <CharacterCard
                            key={character.id}
                            character={{ ...character }}
                            page="characters"
                        />
                    )
                })}
        </Box>
    )
}

export default CharactersPage