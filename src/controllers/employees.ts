import {catchErrors} from '../errors';
import { readEmployeeData } from "../services/employees";
import {Employee} from "../types/employee";
import {getEmployeeData} from "../utils/employee";

export const getEmployees =
    catchErrors(async (req, res) => {
        const body = req.body;
        const data: Employee[]           = await readEmployeeData();
        const employeesData: Employee[]  = await getEmployeeData(data);

        console.log("body", body);

        res.respond({
            employeesData
        });
});








