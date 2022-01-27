import { getMarvelCharacters } from '../../utils/marvel'

function CharactersPage(props){
    if(props.characters){
        console.log(props.characters)
    }
    
    return (
        <h1>this is the characters page</h1>
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