import { API } from 'aws-amplify'
import { listMarvelCharacters } from '../src/graphql/queries'

export async function getAllCharacters(){
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

    return savedCharacters
}