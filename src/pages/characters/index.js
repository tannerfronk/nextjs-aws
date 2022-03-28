import * as React from 'react'
import Box from '@mui/material/Box'
import CharacterCard from '../../components/characters/CharacterCard'
import { CircularProgress } from '@mui/material';
// import { getMarvelCharacters } from '../../../utils/marvel'

const CharactersPage = (props) => {
    const { characters } = props
    console.log(characters)

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

export async function getServerSideProps(){
    const dev = process.env.NODE_ENV !== 'production';
    const env = dev ? 'http://localhost:3000' : 'https://main.d2gdmispgwqige.amplifyapp.com';
    const res = fetch(`${env}/api/characters`)
    .then(res => res.json())
    const data = await res
    return {
        props: {
            characters: data.characters.data.results
        }
    }
}

export default CharactersPage