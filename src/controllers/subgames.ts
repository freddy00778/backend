import {catchErrors} from '../errors';
import DataProvider from "../data/DataProvider";
import omit from  "omit"
import SubGameHandlers from "../data/subgames/SubGameHandlers";


export const getSubGames =
    catchErrors(async (req, res) => {
        const data = await DataProvider.create()
        const subgames =  await (await SubGameHandlers.create(data)).getList()
        // const shuffledGames =

        res.respond({
            body: req.body,
            data: subgames
        });
    });

export const getSubGame =
    catchErrors(async (req, res) => {
        const {id} = req.params
        const data = await DataProvider.create()
        // const subgame =  await (await SubGameHandlers.create(data)).get({id })
        const subgame =  await (await SubGameHandlers.create(data)).get({question: id })

        res.respond({
            data: subgame
        });
    });


export const createSubGame =
    catchErrors(async (req, res) => {

        const data = await DataProvider.create()
        const { question,
            statement_1, statement_2, statement_3, statement_4, statement_5, statement_6,
            answer_1, answer_2, answer_3, answer_4, answer_5, answer_6,
        } = req.body


        const options = {
            statement_1, statement_2, statement_3, statement_4, statement_5, statement_6,
            answer_1, answer_2, answer_3, answer_4, answer_5, answer_6,
        }

        const body = {
            ...req.body,
            question,
            options: options,
        }

        console.log("options", body)
        const questionsBodyObject = omit([
            'statement_1', 'statement_2', 'statement_3', 'statement_4', 'statement_5', 'statement_6',
            'answer_1', 'answer_2', 'answer_3', 'answer_4', 'answer_5', 'answer_6'], body)

        const questionExists = await (await SubGameHandlers.create(data)).get({question})
        const inserted = questionExists ? await (await SubGameHandlers.create(data)).update(questionsBodyObject):
            await (await SubGameHandlers.create(data)).create(questionsBodyObject)

        res.respond({
            data: inserted
        });
    });
