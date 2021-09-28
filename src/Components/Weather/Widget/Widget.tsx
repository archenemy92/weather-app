import React, {useCallback, useEffect} from "react"
import {Container, IconButton} from "@material-ui/core"
import {useStyles} from "./WidgetCSS"
import {CityType} from "../../../Redux/weatherReducer"
import {getCheckedCityInfo} from "../../../Redux/fullInfoReducer"
import {useHistory} from "react-router-dom"
import {useDispatch} from "react-redux"
import DeleteIcon from "@material-ui/icons/Delete"
import RefreshIcon from "@material-ui/icons/Refresh"
import DateRangeIcon from "@material-ui/icons/DateRange"
import ThermostatIcon from "@mui/icons-material/Thermostat"
import AccessTimeIcon from "@mui/icons-material/AccessTime"

type WidgetPropsType = {
    deleteWidget: (id: number) => void
    refreshWidget: (cityTitle: string) => void
}

export const Widget: React.FC<CityType & WidgetPropsType> = (props) => {

    console.log("widget rendered")
    let unix = new Date(props.dt * 1000)

    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()

    const HandleOnClick = useCallback(() => {
        history.push(`/fullInfo`)
        dispatch(getCheckedCityInfo(props.name))
    }, [history])


    useEffect(()=>{
        const cities = localStorage.getItem("cities")
        let parsedCities: CityType[] = []
        if (cities) {
            parsedCities = JSON.parse(cities)
            parsedCities.filter(el => el.id !== props.id)
        }
        localStorage.setItem("cities", JSON.stringify([...parsedCities]))
    }, [props])


    return (
        <Container className={classes.root}>
            <div className={classes.main_card} onClick={HandleOnClick}>
                <div className={classes.card_content}>
                    <div className={classes.img_block}>
                        <img style={{height: "50px", borderRadius: "50%"}}
                             src={`https://www.countryflags.io/${props.sys.country}/flat/64.png`}
                             alt={props.name}/>
                        <div style={{textAlign: "center", padding: "0 0 0 10px"}}>{props.name}</div>
                    </div>
                    <div className={classes.info_block}>
                        <div>
                            <AccessTimeIcon style={{color: "hsl(215, 35%, 74%)", margin: "3px 0 0 0"}}/>
                            {unix.toLocaleTimeString()}
                        </div>
                        <div>
                            <ThermostatIcon style={{color: "hsl(215, 35%, 74%)"}}/>
                            <span>{props.main.temp}</span>
                        </div>
                        <div>
                            <DateRangeIcon style={{color: "hsl(215, 35%, 74%)"}}/>
                            <span>{unix.toLocaleDateString()}</span>
                        </div>

                    </div>
                </div>
            </div>
            <div className={classes.buttons_block}>
                <IconButton style={{color: "red"}} onClick={() => props.deleteWidget(props.id)}>
                    <DeleteIcon fontSize={"small"}/>
                </IconButton>
                <IconButton style={{color: "blue"}} onClick={() => props.refreshWidget(props.name)}>
                    <RefreshIcon fontSize={"small"}/>
                </IconButton>
            </div>
        </Container>
    )
}