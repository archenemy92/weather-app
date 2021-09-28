import React, {useEffect} from "react"
import {Widget} from "./Widget/Widget"
import {Grid} from "@material-ui/core"
import {CircularProgress} from "@material-ui/core"
import {useStyles} from "./WeatherCSS"
import {useDispatch, useSelector} from "react-redux"
import {AppStateType} from "../../Redux/store"
import {CityType} from "../../Redux/weatherReducer"
import {deleteCity} from "../../Redux/weatherReducer"
import {refreshInfo} from "../../Redux/weatherReducer"


export const Weather: React.FC = () => {

    const cities = useSelector<AppStateType, CityType[]>(state => state.weatherPage.cities)
    const isLoad = useSelector<AppStateType, boolean>(state => state.weatherPage.isLoad)
    const error = useSelector<AppStateType, string>(state => state.weatherPage.error)
    const classes = useStyles()
    const dispatch = useDispatch()

    useEffect(()=>{
        localStorage.setItem("cities", JSON.stringify(cities))
    })

    const deleteWidget = (id: number) => {
        dispatch(deleteCity(id))
    }

    const refreshWidget = (cityTitle: string) => {
        dispatch(refreshInfo(cityTitle))
    }

    if (isLoad) {
        return <div
            style={{position: "fixed", top: "30%", textAlign: "center", width: "100%"}}>
            <CircularProgress/>
        </div>
    }

    return (
        !error
            ? <Grid container className={classes.root}>
                {cities.map(c => <Widget key={c.id}
                                         {...c}
                                         city={c}
                                         deleteWidget={deleteWidget}
                                         refreshWidget={refreshWidget}
                />)}
            </Grid>
            : <div style={{textAlign: "center", color: "red"}}><h1>{error}</h1></div>
    )
}