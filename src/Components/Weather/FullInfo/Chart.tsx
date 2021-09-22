import React from "react"
import {Chart} from "react-google-charts"
import {useSelector} from "react-redux"
import {AppStateType} from "../../../Redux/store"
import {DayTempType} from "../../../API/weatherAPI"
import {useStyles} from "./FullInfoCSS"


export const ChartContainer: React.FC = () => {
    const dayData = useSelector<AppStateType, DayTempType[]>(state => state.fullPage.dailyWeather)
    const classes = useStyles()
    let dataArr = dayData.map(el=>{
        return [new Date(el.dt * 1000).toLocaleTimeString().slice(0,-6), el.temp]
    })

    return (
        <div className={classes.chart}>
            <Chart
                height={"500px"}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ["h", "temp"],
                    ...dataArr.splice(23)//delete 24 of 48 elem for correct write data in the chart
                ]}
                options={{
                    hAxis: {
                        title: "Time",
                    },
                    vAxis: {
                        title: "Temperature",
                    },
                }}
                rootProps={{"data-testid": "1"}}
            />
        </div>
    )
}