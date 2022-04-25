import * as React from 'react'
import Box from '@mui/material/Box'
import { DataStore } from 'aws-amplify'
import { MarvelCharacters } from '../../models'
import CharacterCard from '../../components/characters/CharacterCard'
import useSWR from 'swr'

const Favorites = (props) => {
    
    const [favoriteCharacters, setFavoriteCharacters] = React.useState([])
    const {user} = props
    let [userFavorites, setuserFavorites] = React.useState([])

    const fetcher = async () => {
        try {
            let tempCharArr = await DataStore.query(MarvelCharacters)
            let tempUserFavs = []

            favoriteCharacters.forEach(char => {
                if(user.username === char.owner){
                    tempUserFavs.push(char.charID)
                }
            })

            setuserFavorites(tempUserFavs)
            setFavoriteCharacters(tempCharArr)
        } catch (e) {
            console.log("Unable to retrieve favorites", e)
        }
        return favoriteCharacters
    }

    console.log(userFavorites)

    const { data, error } = useSWR('/favorites', fetcher, {refreshInterval: 150})

    if (error) return <div>Unable to load favorites</div>
    if (!data) return <div>Loading...</div>

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
            {

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
                                    favoritesList={favoriteCharacters}
                                    user={user}
                                    // addFavorites={setAsFavorite}
                                />
                            }
                            {card.title &&
                                <CharacterCard
                                    key={card.charID}
                                    cardInfo={{ ...card }}
                                    page="comics"
                                    user={user}
                                    // addFavorites={setAsFavorite}
                                />
                            }
                        </>
                    )
                })}
        </Box>
    )
}

// export async function getStaticProps(){
//     let savedCharacters = await getAllCharacters()

//     return {
//         props: {
//             favoriteCharacters: savedCharacters
//         }
//     }
// }

export default Favorites