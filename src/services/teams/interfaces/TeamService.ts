
export interface TeamService {
    createCompany: (company_name: string, company_function: string, company_size: string, company_industry: string) => Promise<void>
    createTeam: () => Promise<void>
    addMembers: () => Promise<void>
    addEmail: () => Promise<void>
    sendEmail: () => Promise<void>
}