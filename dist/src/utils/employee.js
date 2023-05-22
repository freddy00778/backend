"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmployeeData = exports.uid = void 0;
const countries_1 = require("../services/countries");
const axios_1 = __importDefault(require("axios"));
const country_1 = require("../constants/country");
const _ = __importStar(require("lodash"));
exports.uid = ((countryRegion, employee, ...regions) => {
    const regionOne = regions.length > 0 && regions[0];
    const regionTwo = regions.length > 1 && regions[1];
    const { firstName, lastName, dateOfBirth } = Object.assign({}, employee);
    const employeeName = `${firstName}${lastName}`;
    const reformattedDateOfBirth = dateOfBirth.split("/").join("");
    const hasRegion = (employeeRegion) => countryRegion === employeeRegion;
    const uidForRegion = hasRegion(regionOne) || hasRegion(regionTwo);
    return uidForRegion ? ` ${employeeName}${reformattedDateOfBirth}` : undefined;
});
const getEmployeeData = (employees) => __awaiter(void 0, void 0, void 0, function* () {
    return Promise.all(employees.map((employee) => {
        const countryCode = employee.country;
        return (0, countries_1.getCountry)(countryCode);
    })).then(axios_1.default.spread((...countriesObjectArray) => {
        return remapEmployeeData(employees, countriesObjectArray);
    }));
});
exports.getEmployeeData = getEmployeeData;
const remapEmployeeData = ((employees, countries) => {
    return employees.map((employee) => {
        const country = searchCountry(employee.country, countries);
        const regionsWithId = ["Asia", "Europe"];
        const { id, code, fullName, currency, languages, timeZones, region } = employeeInfo(employee, country, ...regionsWithId);
        const countryObject = { code, fullName, currency, languages, timeZones, region };
        return Object.assign(Object.assign({}, employee), { id, countryObject });
    });
});
const employeeInfo = ((employee, country, ...regions) => {
    const { id, code, fullName, currency, languages, timeZones, region } = {
        id: (0, exports.uid)(country.region, employee, ...regions),
        code: employee.country,
        fullName: country.name.official,
        currency: country.currencies,
        languages: country.languages,
        timeZones: country.timezones,
        region: country.region
    };
    return { id, code, fullName, currency, languages, timeZones, region };
});
const searchCountry = (what, countries) => _.flatten(countries).find(country => country[country_1.CountryIdentifier.CCA2] === what || country[country_1.CountryIdentifier.CCA3] === what);
//# sourceMappingURL=employee.js.map