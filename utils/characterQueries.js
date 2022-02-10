import { API, withSSRContext } from 'aws-amplify'
import { listMarvelCharacters } from '../src/graphql/queries'

export async function getAllCharacters(){
    const { data } = await API.graphql({ query: listMarvelCharacters, authMode: 'API_KEY' })
    let savedCharacters = data.listMarvelCharacters.items
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

export async function getAllCharactersSSR(){
    const SSR = withSSRContext()
    try{
        const { data } = await SSR.API.graphql({ query: listMarvelCharacters, authMode: 'API_KEY' })
        let savedCharacters = data.listMarvelCharacters.items
        savedCharacters.forEach((char) => {
            char.comics = JSON.parse(char.comics)
            char.events = JSON.parse(char.events)
            char.series = JSON.parse(char.series)
            char.stories = JSON.parse(char.stories)
            char.thumbnail = JSON.parse(char.thumbnail)
            char.urls = JSON.parse(char.urls)
        })
    
        return savedCharacters
    } catch(e){
        console.log(e)
    }
}