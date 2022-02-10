import * as React from 'react'
import Box from '@mui/material/Box'
import CharacterCard from '../../components/characters/CharacterCard'
// import { useRouter } from 'next/router'
import { getAllCharacters } from '../../../utils/characterQueries'

const Favorites = (props) => {
    // const router = useRouter()
    const { favoriteCharacters } = props

    console.log(favoriteCharacters)

    return (

        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center'
            }}
        >
            {(!favoriteCharacters || favoriteCharacters.length < 1) &&
                <Box sx={{ margin: 'auto', marginTop: 5 }}>
                    <h2>No Favorites to display, go add some!</h2>
                </Box>
            }
            {favoriteCharacters && favoriteCharacters.length > 0 &&
                favoriteCharacters.map((card) => {
                    return (
                        <>
                            {card.name &&
                                <CharacterCard
                                    key={card.charID}
                                    character={{ ...card }}
                                    page="characters"
                                    // addFavorites={setAsFavorite}
                                />
                            }
                            {card.title &&
                                <CharacterCard
                                    key={card.charID}
                                    cardInfo={{ ...card }}
                                    page="comics"
                                    // addFavorites={setAsFavorite}
                                />
                            }
                        </>
                    )
                })}
        </Box>
    )
}

export async function getStaticProps(){
    let savedCharacters = await getAllCharacters()

    return {
        props: {
            favoriteCharacters: savedCharacters
        }
    }
}

export default Favorites