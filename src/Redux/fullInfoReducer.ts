import {ThunkType} from "./store"
import {CityType, isLoading} from "./weatherReducer"
import {DayTempType, weatherApi} from "../API/weatherAPI"

type FullInfoReducerStateType = {
    dailyWeather: DayTempType[]
    city: CityType
}
export type SetRenderedPageType = ReturnType<typeof setRenderedPage>
export type SetFullCityInfoType = ReturnType<typeof setFullCityInfo>
export type SetDailyWeatherInfoType = ReturnType<typeof setDailyWeatherInfo>
export type FullInfoReducerActionsType = SetRenderedPageType
    | SetFullCityInfoType
    | SetDailyWeatherInfoType

const initState: FullInfoReducerStateType = {
    dailyWeather: [],
    city: {
        id: 0,
        main: {
            feels_like: 0,
            humidity: 0,
            pressure: 0,
            temp: 0,
            temp_max: 0,
            temp_min: 0,
        },
        name: "",
        dt: 0,
        sys: {
            country: "",
            id: 0,
            sunrise: 0,
            sunset: 0,
        },
        weather: [{
            id: "",
            description: "",
        }],
        wind: {
            speed: 0
        },
        coord: {
            lat: 0,
            lon: 0
        }
    },
}

export const fullInfoReducer = (state = initState, action: FullInfoReducerActionsType): FullInfoReducerStateType => {
    switch (action.type) {
        case "SET_FULL_CITY_INFO___FULL_INFO_PAGE": {
            return {
                ...state,
                city: {...action.data}
            }
        }
        case "SET_DAILY_WEATHER_INFO___FULL_INFO_PAGE": {
            return {
                ...state,
                dailyWeather: [...action.data]
            }
        }
        default: {
            return state
        }
    }
}

export const setRenderedPage = (page: string) => {
    return {
        type: "SET_RENDERER_PAGE___FULL_INFO_PAGE",
        page
    } as const
}

export const setFullCityInfo = (data: CityType) => {
    return {
        type: "SET_FULL_CITY_INFO___FULL_INFO_PAGE",
        data
    } as const
}
export const setDailyWeatherInfo = (data: DayTempType[]) => {
    return {
        type: "SET_DAILY_WEATHER_INFO___FULL_INFO_PAGE",
        data
    } as const
}

export const getCheckedCityInfo = (city: string): ThunkType =>
    async (dispatch) => {
        dispatch(setRenderedPage(city))
        dispatch(isLoading())
        const res = await weatherApi.getWeatherInfo(city)
        dispatch(setFullCityInfo(res))
        await dispatch(getDailyWeatherInfo(res.coord.lat, res.coord.lon))
        dispatch(isLoading())
    }

export const getDailyWeatherInfo = (lat: number, lon: number): ThunkType =>
    async (dispatch) => {
        dispatch(isLoading())
        const res = await weatherApi.getDailyWeatherInfo(lat, lon)

        dispatch(setDailyWeatherInfo(res))
        dispatch(isLoading())
    }

