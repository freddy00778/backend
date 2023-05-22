import {catchErrors} from '../errors';
import {createCompany} from "../services/company";

export const dashboardInfo =
    catchErrors(async (req, res) => {

        const { user } = req.body;

        const company =  await createCompany(req)

        res.respond({
            user,
          data: company
        });
    });
