import {ThunkType} from "./store"
import {weatherApi} from "../API/weatherAPI"

export type CityType = {
    id: number
    main: {
        feels_like: number
        humidity: number
        pressure: number
        temp: number
        temp_max: number
        temp_min: number
    }
    name: string
    dt: number
    sys: {
        country: string
        id: number
        sunrise: number
        sunset: number
    }
    weather: {
        id: string
        description: string
    }[]
    wind: {
        speed: number
    }
    coord: {
        lat: number
        lon: number
    }

}
type WeatherStateType = {
    cities: CityType[]
    isLoad: boolean
    error: string
}

export type AddCityType = ReturnType<typeof addCity>
export type IsLoadingType = ReturnType<typeof isLoading>
export type SetCityType = ReturnType<typeof setCity>
export type DeleteCityType = ReturnType<typeof deleteCity>
export type SetErrorType = ReturnType<typeof setError>
export type RefreshCityInfoType = ReturnType<typeof refreshCityInfo>
export type ActionsType = AddCityType
    | SetCityType
    | DeleteCityType
    | RefreshCityInfoType
    | IsLoadingType
    | SetErrorType


let initState: WeatherStateType = {
    cities: [],
    isLoad: false,
    error: ""
}

export const weatherReducer = (state = initState, action: ActionsType): WeatherStateType => {
    switch (action.type) {
        case "SET_CITY_WEATHER": {
            return {
                ...state,
                cities: [...action.cities]

            }
        }
        case "IS_LOADING_WEATHER": {
            return {
                ...state,
                isLoad: !state.isLoad
            }
        }
        case "ADD_CITY_WEATHER": {
            return {
                ...state,
                cities: [...state.cities.filter(c => c.id !== action.city.id), action.city]
            }
        }
        case "DELETE_CITY_WEATHER": {
            return {
                ...state,
                cities: state.cities.filter(c => c.id !== action.id)
            }
        }
        case "REFRESH_CITY_INFO_WEATHER": {
            return {
                ...state,
                cities: state.cities.map(c => {
                    if (c.id === action.city.id) {
                        c = action.city
                    }
                    return c
                })
            }
        }
        case "SET_ERROR_WEATHER": {
            return {
                ...state,
                error: action.error
            }
        }
        default: {
            return state
        }
    }

}

export const addCity = (city: CityType) => {
    return {
        type: "ADD_CITY_WEATHER",
        city
    } as const
}
export const isLoading = () => {
    return {
        type: "IS_LOADING_WEATHER",
    } as const
}

export const setCity = (cities: CityType[]) => {
    return {
        type: "SET_CITY_WEATHER",
        cities
    } as const
}

export const deleteCity = (id: number) => {
    return {
        type: "DELETE_CITY_WEATHER",
        id
    } as const
}

export const refreshCityInfo = (city: CityType) => {
    return {
        type: "REFRESH_CITY_INFO_WEATHER",
        city
    } as const
}

export const setError = (error: string) => {
    return {
        type: "SET_ERROR_WEATHER",
        error
    } as const
}


export const getInfo = (city: string): ThunkType =>
    async (dispatch) => {
        dispatch(isLoading())
        const res = await weatherApi.getWeatherInfo(city)
        if (res === "Something wrong") {
            dispatch(isLoading())
            dispatch(setError("Can't find city, please enter valid data"))
        } else {
            dispatch(addCity(res))
            await dispatch(addCityToLS())
            dispatch(isLoading())
        }
    }

export const refreshInfo = (city: string): ThunkType =>
    async (dispatch) => {
        dispatch(isLoading())
        const res = await weatherApi.getWeatherInfo(city)
        dispatch(refreshCityInfo(res))
        dispatch(isLoading())
    }

export const addCityToLS = (): ThunkType =>
    async (dispatch, getState) => {
        let s = getState().weatherPage.cities
        localStorage.setItem("cities", JSON.stringify([...s]))
    }

export const deleteCityFromLS = (id: number): ThunkType =>
    async () => {
        const cities = localStorage.getItem("cities")
        const parsedCities = []
        if (cities) {
            const arrCities: CityType[] = JSON.parse(cities)
            parsedCities.push(...arrCities)
        }
        let filtered = parsedCities.filter(el => el.id !== id)
        localStorage.setItem("cities", JSON.stringify([...filtered]))
    }

export const setInfo = (): ThunkType =>
    async (dispatch) => {
        const cities = localStorage.getItem("cities")
        if (cities) {
            const arrCities: CityType[] = JSON.parse(cities)
            dispatch(setCity(arrCities))
        }
    }

