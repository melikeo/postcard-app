import countryList from "react-select-country-list";

export type CountryOption = {
  label: string;
  value: string;
};

export const countryOptions: CountryOption[] = countryList().getData();
