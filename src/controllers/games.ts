import {catchErrors} from '../errors'
import DataProvider from "../data/DataProvider";
import GameHandlers from "../data/game/GameHandlers";


export const create =
    catchErrors(async (req, res) => {

        const data = await DataProvider.create()
        const { media } = req.body

        const body = {
            ...req.body,
            media: media.value
        }

        console.log("Body", body)

        const game = (await GameHandlers.create(data)).create(body)

        return res.respond({
           game
        })
    })


export const getAll =
    catchErrors(async (req, res) => {
        const data = await DataProvider.create()
        const games = await ( await GameHandlers.create(data)).list()
        console.log("data", req.body)

        return res.respond({
            games
        })
    })

export const getGame =
    catchErrors(async (req, res) => {
        const {id} = req.params
        const data = await DataProvider.create()
        const games = await ( await GameHandlers.create(data)).getById(id)
        console.log("data", req.body)

        return res.respond({
            games
        })
    })