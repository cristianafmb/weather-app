import { NextFiveDays, Condition } from "./response";

export type ResultType = {
    time: string;
    country: string;
    cityName: string;
    temperatureC: number | null;
    temperatureF: number | null;
    nextFiveDays: NextFiveDays[];
    condition: Condition;
};

export type Degrees = {
    temperature: string | null;
    maxTemp: string | null;
    minTemp: string | null;
}