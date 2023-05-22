import axios from "axios";
import { Country } from '../types/country'

const baseUrl = process.env.REST_COUNTRY_BASE_URL;

const headers = {
    headers: {
        Accept: 'application/json',
    }
};

export const getCountry = async (countryCode) => {
    try {
        const {data} = await axios.get<Country[]>(`${baseUrl}/v3.1/alpha/${countryCode}`,headers);
        return data;

    }catch (e) {
        console.log(e)
    }
}