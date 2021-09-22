import React from "react"
import {useCallback} from "react"
import {Container, IconButton} from "@material-ui/core"
import {Card} from "@material-ui/core"
import {useHistory} from "react-router-dom"
import {NavLink} from "react-router-dom"
import {useSelector} from "react-redux"
import {useDispatch} from "react-redux"
import {AppStateType} from "../../../Redux/store"
import {refreshInfo} from "../../../Redux/weatherReducer"
import {CityType} from "../../../Redux/weatherReducer"
import {useStyles} from "./FullInfoCSS"
import {ChartContainer} from "./Chart"
import CloseIcon from "@material-ui/icons/Close"
import RefreshIcon from "@material-ui/icons/Refresh"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import DateRangeIcon from "@material-ui/icons/DateRange"
import Brightness1Icon from "@mui/icons-material/Brightness1"
import Brightness2Icon from "@mui/icons-material/Brightness2"
import ThermostatIcon from "@mui/icons-material/Thermostat"
import CompressIcon from "@mui/icons-material/Compress"
import OpacityIcon from "@mui/icons-material/Opacity"
import CloudIcon from "@mui/icons-material/Cloud"
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow"


export const FullInfo = () => {
    const city = useSelector<AppStateType, CityType>(state => state.fullPage.city)
    let unix = new Date(city.dt * 1000)
    let sunrise = new Date(city.sys.sunrise * 1000).toLocaleTimeString()
    let sunset = new Date(city.sys.sunset * 1000).toLocaleTimeString()
    const classes = useStyles()


    const dispatch = useDispatch()
    const history = useHistory()

    const refreshCityWeather = () => {
        dispatch(refreshInfo(city.name))
    }

    const HandleClose = useCallback(() => {
        history.push(`/`)
    }, [history])

    return (
        <Container className={classes.root}>
            <Card className={classes.card_content}>
                {!city.name
                    ? <>
                        <h3 className={classes.header}>please check widget</h3>
                        <NavLink to={"/"}>go back</NavLink>
                    </>

                    : <>
                        <div style={{display: "flex"}}>
                            <div className={classes.info_block}>
                                <div className={classes.info_content__block}>
                                    <div>
                                        <IconButton style={{color: "blue"}}>
                                            <RefreshIcon fontSize={"small"} onClick={refreshCityWeather}/>
                                        </IconButton>
                                        <h3>{city.name}</h3>

                                        <img
                                            src={`https://www.countryflags.io/${city.sys.country}/flat/64.png`}
                                            alt={city.name}
                                        />

                                    </div>
                                    <div className={classes.weather_info__block}>
                                        <ul>
                                            <li><AccessTimeIcon/> time
                                                <div>
                                                    {unix.toLocaleTimeString()}
                                                </div>
                                            </li>
                                            <li><DateRangeIcon/> date
                                                <div>
                                                    {unix.toLocaleDateString()}
                                                </div>
                                            </li>
                                            <li>
                                                <Brightness1Icon/> sunrise
                                                <div>{sunrise}</div>
                                            </li>
                                            <li>
                                                <Brightness2Icon/> sunset
                                                <div>{sunset}</div>
                                            </li>
                                        </ul>
                                        <ul className={classes.temperatureBlock}>
                                            <li>
                                                <ThermostatIcon/> temp
                                                <div>{city.main.temp}</div>
                                            </li>
                                            <li>
                                                <ThermostatIcon/>like a
                                                <div>{city.main.feels_like}</div>
                                            </li>
                                            <li>
                                                <OpacityIcon/> humid
                                                <div>{city.main.humidity}</div>
                                            </li>
                                            <li>
                                                <CompressIcon/> press
                                                <div>{city.main.pressure}</div>
                                            </li>
                                            <li>
                                                <ThermostatIcon/>
                                                max <div>{city.main.temp_max}</div>
                                            </li>
                                            <li>
                                                <ThermostatIcon/>
                                                min <div>{city.main.temp_min}</div>
                                            </li>
                                        </ul>
                                        <div>
                                            <CloudIcon/>weather
                                            <div>{city.weather[0].description}</div>
                                        </div>
                                        <div>
                                            <DoubleArrowIcon/>wind
                                           <div>{city.wind.speed} m</div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className={classes.button}>
                                <IconButton style={{color: "red"}}>
                                    <CloseIcon fontSize={"small"} onClick={HandleClose}/>
                                </IconButton>
                            </div>
                            <div >
                                <ChartContainer/>
                            </div>
                        </div>
                        <div>

                        </div>
                    </>
                }
            </Card>
        </Container>

    )
}

