import {Country} from "./country";

export interface Employee {
  firstName : string,
  lastName: string,
  dateOfBirth: string,
  jobTitle: string,
  company: string,
  country: Country
}
