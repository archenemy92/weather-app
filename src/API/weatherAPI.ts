import axios from "axios"
import {CityType} from "../Redux/weatherReducer"

export type DayTempType = {
    temp: number
    dt: number
    clouds: number
    dew_point: number
    feels_like: number
    humidity: number
    pop: number
    pressure: number

    uvi: number
    visibility: number
    weather: {
        description: string
        icon: string
        id: number
        main: string
    }[]
    wind_deg: number
    wind_gust: number
    wind_speed: number
}
export type ResponseDayTempDataType = {
    current: {
        clouds: number
        dew_point: number
        dt: number
        feels_like: number
        humidity: number
        pressure: number
        sunrise: number
        sunset: number
        temp: number
        uvi: number
        visibility: number
    }
    hourly: DayTempType[]
    lat: number
    lon: number
    minutely: {
        dt: number
        precipitation: number
    }[]
    timezone: string
    timezone_offset: number

}

export const weatherApi = {
    getWeatherInfo(city: string) {
        return axios.get<CityType | any>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=671ec129d126e4a3a9fa78e514fcc519&units=metric`)
            .then(res => res.data)
            .catch(e => {
                return e.message = "Something wrong"
            })
    },
    getDailyWeatherInfo(lat: number, lon: number) {
        return axios.get<ResponseDayTempDataType | any>(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=daily&appid=671ec129d126e4a3a9fa78e514fcc519&units=metric`)
            .then(res => res.data.hourly)
            .catch(e => {
                return e.message = "Something wrong"
            })

    }
}


