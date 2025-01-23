import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import stocks from "./stocksTZ.json";
import { Moment } from "moment-timezone";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getUserTimeZoneInBrowser = (): string => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};


export interface IStockMarket {
  name: string;
  shortName: string;
  type: string;
  city: string;
  country: string;
  timezone: string;
  offset: string;
  startTime: string;
  endTime: string;
  breakTime?: string;
  now?:Date|Moment;
  open?:boolean;
}

/**
 * read CSV file and return stock markets
 * Name,Short Name,Type,City,Country,Timezone Name,UTC Offset,Start Time,End Time,Break Time
    New York Stock Exchange,NYSE,Stock,New York City,United States,EST,UTC-5,09:30,16:00,None
 * @returns 
 */

export const getStockMarkets = ():IStockMarket[] => {
  return stocks;
};
