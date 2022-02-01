import * as React from 'react'
import Amplify, { API } from 'aws-amplify'
import config from '../../aws-exports'
import Box from '@mui/material/Box'
import CharacterCard from '../../components/characters/CharacterCard'
import { CircularProgress } from '@mui/material';
import { getMarvelCharacters } from '../../../utils/marvel'


Amplify.configure(config)

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

export async function getStaticProps(){
    const characterData = await getMarvelCharacters()
    console.log(characterData.data.results)
    return {
        props: {
            characters: characterData.data.results
        }
    }
}

export default CharactersPage