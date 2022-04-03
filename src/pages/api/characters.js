// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import md5 from 'md5'

export default async function handler(req, res) {

    let ts = new Date().getTime()
    let message = ts + process.env.MARVEL_PRIVATE + process.env.MARVEL_PUBLIC

    let hash = md5(message)

    let response = await fetch(`https://gateway.marvel.com:443/v1/public/characters?limit=100&ts=${ts}&apikey=${process.env.MARVEL_PUBLIC}&hash=${hash}`)

    let characters = await response.json()

    res.status(200).json({ characters })
}
