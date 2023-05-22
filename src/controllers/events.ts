import {catchErrors} from "../errors";
import DataProvider from "../data/DataProvider";
import EventHandlers from "../data/events/EventHandlers";


export const getEvents =
    catchErrors(async (req, res) => {
        const data = await DataProvider.create()
        const list =  await (await EventHandlers.create(data)).getList()

        res.respond({
            body: req.statusCode,
            list: list
        });
    });
