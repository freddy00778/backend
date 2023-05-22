export interface CountryNameObject{
  common: string,
  official: string
}


export interface Country {
  name: CountryNameObject;
  currencies: any;
  languages: any;
  timezones: [],
  region: string
}
