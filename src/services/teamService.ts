import DataProvider from "../data/DataProvider";
import TeamHandlers from "../data/teams/TeamHandlers";
import omit from "omit"
import TeamUserHandlers from "../data/teamUser/TeamUserHandlers";


export const createTeam = async(req) => {
    const data = await DataProvider.create()
    return await (await TeamHandlers.create(data)).create(req)
}

export const updateTeam = async(body) => {
    const data = await DataProvider.create()
    return await (await TeamHandlers.create(data)).update(body);
}

export const incrementMemberCount = async(data, license, company) => {

    const team  = await (await TeamHandlers.create(data)).getById({license, company})
    const no_of_members = team?.no_of_members ?  team?.no_of_members+1 : 0;
    const body = {
        ...team,
        no_of_members
    }

    console.log("Team service", body)
    console.log("Team service object", team)

    //@ts-ignore
    const bodyObject = omit(["company_name","industry_name", "company_id"], body)

    // @ts-ignore
    await (await TeamHandlers.create(data)).update({id: team?.id, no_of_members})
}

export const decrementMemberCount = async(data, license, company, user) => {
    console.log("data license company", company)
    const team  = await (await TeamHandlers.create(data)).getById({license, company})
    console.log("user and team", user)
    await (await TeamUserHandlers.create(data)).delete({user: user.id, team: team.id})
    // await (await TeamUserHandlers.create(data)).delete({user: user.id})
    const no_of_members = team && team.no_of_members != 0 ? team.no_of_members-1 : 0;
    const body = {
        ...team,
        no_of_members
    }

    const bodyObject = omit(["company_name","industry_name","company", "company_id"], body)

    // @ts-ignore
    await (await TeamHandlers.create(data)).update(bodyObject)
}