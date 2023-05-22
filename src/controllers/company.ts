import {catchErrors} from '../errors';
import {createCompany, updateCompany} from "../services/company";

export const create =
    catchErrors(async (req, res) => {

        const { name } = req.body;

        if (!( name)) {
            return res.status(400).send("Name is required!");
        }

        const company =  await createCompany(req)

        res.respond({
          data: company
        });
    });

export const update =
    catchErrors(async (req, res) => {
        const company = await updateCompany(req.body)

        res.respond({
            data: company
        })
    })