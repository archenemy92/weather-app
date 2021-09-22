import {createStyles, makeStyles, Theme} from "@material-ui/core"

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {

        },
        card_content: {
            "& > div": {
                margin: "5px 10px"
            },
            margin: "10px 0"
        },
        header: {},
        img_block: {},
        info_block: {

            fontWeight: "bold"
        },
        info_content__block: {

        },
        weather_info__block: {
            "& > ul": {
                listStyleType: "none",
            },
            "& > ul > li > svg": {
                color: "hsl(307, 31%, 86%)"
            },
            color: "hsl(205, 5%, 39%)"
        },
        temperatureBlock: {},
        button: {},
        chart: {
            minWidth: "1000px",
        }
    }),
)

