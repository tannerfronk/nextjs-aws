const md5 = require('md5')

export async function getMarvelCharacters(){
    let ts = new Date().getTime()
    let message = ts + process.env.MARVEL_PRIVATE + process.env.MARVEL_PUBLIC

    let hash = md5(message)

    let response = await fetch(`https://gateway.marvel.com:443/v1/public/characters?limit=100&ts=${ts}&apikey=${process.env.MARVEL_PUBLIC}&hash=${hash}`)

    return await response.json()
}

export async function getMarvelCharacterByID(charID){
    let ts = new Date().getTime()
    let message = ts + process.env.MARVEL_PRIVATE + process.env.MARVEL_PUBLIC

    let hash = md5(message)

    let response = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${charID}?apikey=${process.env.MARVEL_PUBLIC}&ts=${ts}&hash=${hash}`)

    return await response.json()
}