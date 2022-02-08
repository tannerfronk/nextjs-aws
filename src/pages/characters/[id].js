import * as React from 'react'
import { Box, Button, Card, CardMedia, CardHeader, Divider, Typography, Table, TableBody, TableCell, TableRow } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { API } from 'aws-amplify'
import { listMarvelCharacters, getMarvelCharacters } from '../../graphql/queries';

const CharacterDetails = (props) => {
    const { character } = props
    console.log(character)

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Box sx={{
                maxWidth: 1200,
                display: 'flex',
                flexDirection: 'row'
                }}>
                <Card sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    backgroundColor: '#222',
                    color: 'white',
                    borderColor: 'black'
                }}>
                    <CardMedia component='img' alt='Marvel Character' sx={{width: 500}}
                        image={character.thumbnail.path + '/detail.' + character.thumbnail.extension} />
                </Card>
                <Card sx={{ 
                    minWidth: 600,
                    maxWidth: 700,
                    backgroundColor: '#222',
                    color: 'white',
                    borderColor: 'black' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>

                        <CardHeader title={(type === 'characters') ? "Character Details" : "Comic Details"} />
                        <Button sx={{ color: 'white' }}><ArrowBackIcon /></Button>
                    </Box>
                    <Divider light='true' color="white" />
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Typography
                                        color="white"
                                        variant="subtitle2"
                                    >
                                        Name
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        color="white"
                                        variant="body2"
                                    >
                                        {character.name}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography
                                        color="white"
                                        variant="subtitle2"
                                    >
                                        Description
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        color="white"
                                        variant="body2"
                                    >
                                        {character.description === "" ? "N/A" : character.description }
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography
                                        color="white"
                                        variant="subtitle2"
                                    >
                                        Comic Appearances
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        color="white"
                                        variant="body2"
                                    >
                                        {character.comics.available}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography
                                        color="white"
                                        variant="subtitle2"
                                    >
                                        Series Appearances
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        color="white"
                                        variant="body2"
                                    >
                                        {character.series.available}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography
                                        color="white"
                                        variant="subtitle2"
                                    >
                                        Comics Page
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        color="white"
                                        variant="body2"
                                    >
                                        <a style={{ color: 'white' }} href={character.urls[1].url} target="_blank" rel="noreferrer">Click Here</a>
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography
                                        color="white"
                                        variant="subtitle2"
                                    >
                                        Wiki Page
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        color="white"
                                        variant="body2"
                                        className="link"
                                    >
                                        <a style={{ color: 'white' }} href={character.urls[1].url} target="_blank" rel="noreferrer">Click Here</a>
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Card>
            </Box>
        </Box>
    )
}

export async function getStaticProps(context){
    const character = context.params.id

    const response = await API.graphql({ query: getMarvelCharacters, variables: { charID: character }})

    return {
        props: {
            character: response.data.getMarvelCharacters
        }
    }
}

export async function getStaticPaths(){
    const response = await API.graphql({ query: listMarvelCharacters })
    let characters = response.data.listMarvelCharacters.items
    characters.forEach((char) => {
        char.comics = JSON.parse(char.comics)
        char.events = JSON.parse(char.events)
        char.series = JSON.parse(char.series)
        char.stories = JSON.parse(char.stories)
        char.thumbnail = JSON.parse(char.thumbnail)
        char.urls = JSON.parse(char.urls)
    })

    const paths = characters.map(character => ({ params: { id: character.id} }))

    return {
        paths: paths,
        fallback: false
    }
}

export default CharacterDetails