import * as React from 'react'
import Box from '@mui/material/Box'
import CharacterCard from '../../components/characters/CharacterCard'
import { API } from 'aws-amplify'
import { useRouter } from 'next/router'
import { listMarvelCharacters } from '../../graphql/queries'

const Favorites = (props) => {
    const router = useRouter()
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
                                    key={card.id}
                                    character={{ ...card }}
                                    page="characters"
                                    // addFavorites={setAsFavorite}
                                />
                            }
                            {card.title &&
                                <CharacterCard
                                    key={card.id}
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
    const response = await API.graphql({ query: listMarvelCharacters })
    let savedCharacters = response.data.listMarvelCharacters.items
    savedCharacters.forEach((char) => {
        char.comics = JSON.parse(char.comics)
        char.events = JSON.parse(char.events)
        char.series = JSON.parse(char.series)
        char.stories = JSON.parse(char.stories)
        char.thumbnail = JSON.parse(char.thumbnail)
        char.urls = JSON.parse(char.urls)
    })

    return {
        props: {
            favoriteCharacters: savedCharacters
        }
    }
}

export default Favorites