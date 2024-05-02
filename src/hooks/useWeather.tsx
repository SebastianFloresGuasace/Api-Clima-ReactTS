import axios from "axios";
// import { z } from "zod";
import { number, object, string, Output, parse } from "valibot";
import { SearchType } from "../components/types";
import { useState } from "react";

//zod schema
// const Weather = z.object({
//   name:  z.string(),
//   main: z.object({
//     temp: z.number(),
//     temp_min: z.number(),
//     temp_max: z.number(),
//   })
// })
// type weather = z.infer<typeof Weather>

//valibot
const WeatherSchema = object({
    name: string(),
    main: object({
        temp: number(),
        temp_min: number(),
        temp_max: number(),
    }),
});
export type Weather = Output<typeof WeatherSchema>;

const initialState = {
    name: '',
    main: {
        temp: 0,
        temp_max: 0,
        temp_min: 0,
    },
}

export default function useWeather() {
    // Crea un state para guardar los datos y mostrarlos
    const [weather, setWeather] = useState<Weather>(initialState);
    const [loading, setLoading] = useState(false)
    const [notFound, setNotFound] = useState(false)

    const fetchWeather = async (search: SearchType) => {
        
        const appId = import.meta.env.VITE_API_KEY;
        setLoading(true)
        setNotFound(false)
        setWeather(initialState)
        try {
            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city}},${search.country}&appid=${appId}`;
            const { data } = await axios(geoUrl);
            // Verifica si existe 
            if (!data[0]) {
                setNotFound(true)
                return
            }
            const lat = data[0].lat;
            const lon = data[0].lon;

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;

            //zod
            // const {data: weatherResult} = await axios(weatherUrl)
            // const result = Weather.safeParse(weatherResult)
            // if (result.success) {
            //   console.log(result.data.name);
            //   console.log(result.data.main.temp);
            // }

            //valibot
            const { data: weatherResult } = await axios(weatherUrl);
            const result = parse(WeatherSchema, weatherResult);
            if (result) {
                setWeather(result);
                // console.log(result);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
            // setNotFound(false)
        }
    };

    return {
        weather,
        loading,
        notFound,
        fetchWeather,
    };
}
