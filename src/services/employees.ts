import * as path from "path";
import {Employee} from "../types/employee";
const { readFile } = require('fs')

const filePath = path.join('src/','data', 'employees.json');

export const readEmployeeData = async (): Promise<Employee[]> => {
    return new Promise((resolve, reject) => {
        readFile(filePath, 'utf-8', (err, fileContent) => {
            if (err != null ){
                reject(err);
                return;
            }
            resolve(JSON.parse(fileContent));
        })
    })
}


