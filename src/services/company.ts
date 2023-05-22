import DataProvider from "../data/DataProvider";
import CompanyHandlers from "../data/company/CompanyHandlers";

export const createCompany = async(req) => {

    const data = await DataProvider.create()

    return await (await CompanyHandlers.create(data)).create(req)
}

export const updateCompany = async(req) => {
    const data = await DataProvider.create()
    return await (await CompanyHandlers.create(data)).update(req.body);
}