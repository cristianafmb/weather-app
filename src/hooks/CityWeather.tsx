import { useState } from "react";
import { NextFiveDays, ResponseType } from "../types/response";
import axios from "axios";
import { data } from "react-router-dom";

export const CityWeather = () => {

    const [loading, setLoading] = useState<boolean>(false);

    const [city, setCity] = useState<string>("");

    const [results, setResults] = useState<ResponseType>({
      time: "",
      country: "",
      cityName: "",
      temperatureC: null,
      temperatureF: null,
      nextFiveDays: [],
      condition: {
        code: 0,
        icon: "",
        text: ""
      },
    });

    const getWeather = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        axios
          .get<ResponseType>(
            `https://api.weatherapi.com/v1/forecast.json?key=06089eaa76bc4c19bd6210638240212&q=${city}&days=5&aqi=yes&alerts=no`
          )
          .then((res : any) => {
            var dataFiveDays: { date: any; maxTempC: any; maxTempF: any; minTempC: any; minTempF: any; cityName: any; temperatureC: any; temperatureF: any; condition: { text: any; icon: any; code: any; }; }[] = []
            res.data.forecast.forecastday.map(function(day: any) {
              dataFiveDays.push(
                {date: day.date,
                  maxTempC: day.day.maxtemp_c,
                  maxTempF: day.day.maxtemp_f,
                  minTempC: day.day.mintemp_c,
                  minTempF: day.day.mintemp_f,
                  cityName: res.data.location.name,
                  temperatureC: res.data.current.temp_c,
                  temperatureF: res.data.current.temp_f,
                  condition: {
                    text: day.day.condition.text,
                    icon: day.day.condition.icon,
                    code: day.day.condition.code,
                  }}
              )
            });
            setResults({
              time: res.data.location.localtime,
              country: res.data.location.country,
              cityName: res.data.location.name,
              temperatureC: res.data.current.temp_c,
              temperatureF: res.data.current.temp_f,
              condition: {
                  code: res.data.current.condition.code,
                  icon: res.data.current.condition.icon,
                  text: res.data.current.condition.text
              },
              nextFiveDays: dataFiveDays
            });
             setCity("");
             setLoading(false);
          })
          .catch((error : any) =>{
            alert('An error occured! Please verify the City\'s name or try again later')
            setLoading(false);
          }
          );
      };
    
      return { loading, city, setCity, getWeather, results };

}