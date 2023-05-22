import {catchErrors} from '../errors'
import DataProvider from "../data/DataProvider";
import PhaseHandlers from "../data/phases/PhaseHandlers";

export const create =
    catchErrors(async (req, res) => {

        // const {name, description} = req.body

        // if (!(name && description)){
        //     return res.status(400).send("name and description are required")
        // }

        const data = await DataProvider.create()
        const phase = await (await PhaseHandlers.create(data)).create(req.body)

        res.respond({
            phase
        });
    });

export const getAll =
    catchErrors(async (req, res) => {

        console.log("Log", req)
        const data = await DataProvider.create()
            const phases = await ( await PhaseHandlers.create(data)).getList()

        return res.respond({
            phases
        })
    })