import { Dispatch, SetStateAction } from "react";

export type Country = {
  name: string;
  count: number;
};

export type setCountry = Dispatch<SetStateAction<Country>>;

export interface SidebarProps {
  activeCountry: Country;
  setActiveCountry: setCountry;
}

export type City = {
  name: string;
  country?: string;
  subcountry?: string;
  geonameid?: number;
};

export interface TableProps {
  activeCountry: Country;
}

export interface PaginationProps {
  page: number;
  setStatePage: Dispatch<SetStateAction<number>>;
  pageSize: number;
  setStatePageSize: Dispatch<SetStateAction<number>>;
  count: number;
  lastPage: number;
  leftRange: number[];
  rightRange: number[];
}
