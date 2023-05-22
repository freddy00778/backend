import {Employee} from "../types/employee";
import {getCountry} from "../services/countries";
import axios from "axios";
import {Country} from "../types/country";
import {CountryIdentifier} from "../constants/country";
import * as _ from "lodash";

export const uid = ((countryRegion: string, employee: Employee, ...regions: string[]): string|undefined =>  {
    const regionOne: string|boolean             =  regions.length > 0 && regions[0];
    const regionTwo: string|boolean             =  regions.length > 1 && regions[1];
    const { firstName, lastName, dateOfBirth}   =  { ...employee }
    const employeeName: string                  = `${firstName}${lastName}`;
    const reformattedDateOfBirth: string        =  dateOfBirth.split("/").join("");
    const hasRegion                             = (employeeRegion: string|boolean) : boolean => countryRegion === employeeRegion;
    const uidForRegion: boolean                 =  hasRegion(regionOne) || hasRegion(regionTwo)

    return  uidForRegion ?` ${employeeName}${reformattedDateOfBirth}` : undefined;
});

export const getEmployeeData: (employees) => Promise<any> = async  (employees) =>{
    return Promise.all(employees.map((employee) => {
        const countryCode: string = employee.country;
        return getCountry(countryCode)
    })).then(
        axios.spread((...countriesObjectArray) =>{
            return remapEmployeeData(employees, countriesObjectArray);
        })
    )
}

const  remapEmployeeData = ((employees: Employee[], countries: Country[]): object  => {
    return employees.map((employee: Employee) => {
        const country: Country = searchCountry(employee.country,countries,);
        const regionsWithId: string[] = ["Asia", "Europe"];
        const {
            id,
            code,
            fullName,
            currency,
            languages,
            timeZones,
            region
        } = employeeInfo(employee, country, ...regionsWithId);
        const countryObject = { code, fullName, currency, languages, timeZones, region }

        return {
            ...employee, id,countryObject
        }
    });
})

const  employeeInfo = ((employee: Employee, country: Country, ...regions: string[]) : any  =>{
    const {id, code, fullName, currency, languages, timeZones, region} =
        {
            id:        uid(country.region, employee, ...regions),
            code:      employee.country,
            fullName:  country.name.official,
            currency:  country.currencies,
            languages: country.languages,
            timeZones: country.timezones,
            region:    country.region
        }
    return {id, code, fullName, currency, languages, timeZones, region};
})

const searchCountry = (what, countries):Country => _.flatten(countries).find(country =>
    country[CountryIdentifier.CCA2] === what || country[CountryIdentifier.CCA3] === what);




