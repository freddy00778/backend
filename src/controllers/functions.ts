import {catchErrors} from '../errors';
import DataProvider from "../data/DataProvider";
import FunctionHandlers from "../data/functions/FunctionHandlers";


export const getFunctions =
    catchErrors(async (req, res) => {
        const data = await DataProvider.create()
        const functions =  await (await FunctionHandlers.create(data)).getList()

        res.respond({
            body: req.body,
            data: functions
        });
    });
