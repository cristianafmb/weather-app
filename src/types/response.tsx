export type ResponseType = {
    time: string;
    country: string;
    cityName: string;
    temperatureC: number | null;
    temperatureF: number | null;
    nextFiveDays: NextFiveDays[];
    condition: Condition;
};

export type NextFiveDays = {
    date: Date;
    maxTempC: number | null;
    maxTempF: number | null;
    minTempC: number | null;
    minTempF: number | null;
    cityName: string;
    temperatureC: number | null;
    temperatureF: number | null;
    condition: Condition;
};

export interface Location {
    name: string;
    country: string;
}

export interface Condition {
    text: string;
    icon: string;
    code: number;
}