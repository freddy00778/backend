import {catchErrors} from '../errors';
import DataProvider from "../data/DataProvider";
import IndustryHandlers from "../data/industries/IndustryHandlers";



export const getIndustries =
    catchErrors(async (req, res) => {
        const data = await DataProvider.create()
        const industries =  await (await IndustryHandlers.create(data)).getList()

        res.respond({
            body: req.body,
            data: industries
        });
    });


export const createIndustry =
    catchErrors(async (req, res) => {

        const data = await DataProvider.create()
        const { name } = req.body;
        if (!(name)) {
            res.status(400).send("All inputs are required!");
        }

        const body = {
            ...req.body,
            name
        }
        const inserted =  await (await IndustryHandlers.create(data)).create(body)

        res.respond({
            data: inserted
        });
    });
