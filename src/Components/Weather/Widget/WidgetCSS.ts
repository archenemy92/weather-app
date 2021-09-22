import {createStyles, makeStyles, Theme} from "@material-ui/core"

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            "& > div:hover": {
                cursor: "pointer",
            },
            width: "200px",
            margin: "10px",
            border: "2px solid hsl(199, 21%, 91%)",
            borderRadius: "10%",
            backgroundColor: "hsl(167, 100%, 92%)",
           fontWeight:"bold"
        },
        main_card: {

        },
        card_content: {
            margin: "5px"
        },
        img_block: {
            display: "flex",
        },
        info_block: {
            margin: "10px"
        },
        buttons_block: {
            "&>button": {
                margin: "5px 0"
            },
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            margin: "0 0 0 0",
        }
    }),
)