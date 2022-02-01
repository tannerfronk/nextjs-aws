import * as React from 'react'
import { API } from 'aws-amplify'
import Card from '@mui/material/Card'
import { IconButton, Typography } from '@mui/material'
import { CardMedia } from '@mui/material'
import { CardContent } from '@mui/material'
import { CardActions } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import Grow from '@mui/material/Grow';
import { useRouter } from 'next/router'
import { createMarvelCharacters } from '../../graphql/mutations'
import { listMarvelCharacters } from '../../graphql/queries'

const CharacterCard = (props) => {
    const [ favorite, setFavorite ] = React.useState(false)
    const { character, page } = props
    // const { favorites, setAsFavorite } = useMarvelContext()
    let cardTitle = ''
    let width = '200'

    if (page === 'characters') {
        cardTitle = character.name
    } else if (page === 'comics') {
        cardTitle = character.title
    }

    const handleSetFavorite = async () => {
        setFavorite(!favorite)

        const newCharacterToSave = {
            comics: JSON.stringify(character.comics),
            description: character.description,
            events: JSON.stringify(character.events),
            charID: character.id,
            modified: character.modified,
            name: character.name,
            resourceURI: character.resourceURI,
            series: JSON.stringify(character.series),
            stories: JSON.stringify(character.stories),
            thumbnail: JSON.stringify(character.thumbnail),
            urls: JSON.stringify(character.urls),
        }

        try{
            const response = await API.graphql({
                query: createMarvelCharacters,
                variables: { input: newCharacterToSave },
                authMode: 'API_KEY'
            })

            const savedCharacters = await API.graphql({ query: listMarvelCharacters})
            savedCharacters = savedCharacters.data.listMarvelCharacters.items
            savedCharacters.forEach((char) => {
                char.comics = JSON.parse(char.comics)
                char.events = JSON.parse(char.events)
                char.series = JSON.parse(char.series)
                char.stories = JSON.parse(char.stories)
                char.thumbnail = JSON.parse(char.thumbnail)
                char.urls = JSON.parse(char.urls)
            })
            
            console.log(savedCharacters)
            console.log('created new character entry')
            console.log(response)
        } catch(e){
            console.log(e)
        }
    }

    const handleInfoClick = () => {
        useRouter.push(`/details/${page}/${character.id}`)
    }

    // React.useEffect(() => {
    //     favorites.indexOf(cardInfo.id) !== -1 ? setFavorite(true) : setFavorite(false)
    //   }, [cardInfo.id, favorites])

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                m: 1,
                border: 2,
                width: width,
                maxWidth: 200,
                backgroundColor: '#222',
                color: 'white',
                borderColor: 'black'
            }}
        >
            <CardMedia component='img' alt='Marvel Character' height='200'
                image={character.thumbnail.path + '/standard_xlarge.' + character.thumbnail.extension} />
            <CardContent>
                <Typography>{cardTitle}</Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <IconButton sx={{ p: 0, m: 0 }} onClick={handleSetFavorite}>
                    <Grow in={favorite} mountOnEnter unmountOnExit
                        {...(favorite ? { timeout: 1500 } : {})}
                        style={{ position: 'absolute', marginLeft: '1.5rem' }}>
                        <FavoriteIcon sx={{ color: '#F0131E' }} />
                    </Grow>
                    <Grow in={!favorite} mountOnEnter unmountOnExit 
                        {...(!favorite ? { timeout: 1500 } : {})}
                        style={{ position: 'absolute', marginLeft: '1.5rem' }}>
                        <FavoriteIcon sx={{ color: '#555' }} />
                    </Grow>
                </IconButton>
                <IconButton sx={{ p: 0, color: '#F0131E' }} onClick={handleInfoClick}>
                    {character.name &&
                        <PermIdentityIcon />
                    }
                    {character.title &&
                        <MenuBookIcon />
                    }
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default CharacterCard