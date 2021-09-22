import React from "react"
import {AppBar, InputBase} from "@material-ui/core"
import {Toolbar} from "@material-ui/core"
import {Typography} from "@material-ui/core"
import {useStyles} from "./HeaderCSS"
import {useFormik} from "formik"
import {useDispatch} from "react-redux"
import {getInfo, setError} from "../../Redux/weatherReducer"

export const Header: React.FC = () => {
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            cityTitle: "",
        },
        onSubmit: (values, {resetForm}) => {
            dispatch(getInfo(values.cityTitle.toUpperCase()))
            dispatch(setError(""))
            resetForm()
        },
    })

    const classes = useStyles()

    return (
        <AppBar position="sticky" style={{backgroundColor:"hsl(269, 85%, 95%)",color:"black"}}>
            <Toolbar>
                <form onSubmit={formik.handleSubmit}>
                    <InputBase
                        style={{backgroundColor:"hsl(269, 85%, 95%)", color:"black"}}
                        placeholder="Search your city…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{"aria-label": "search"}}
                        id="cityTitle"
                        name="cityTitle"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.cityTitle}
                    />
                </form>
                <Typography variant="h6" className={classes.title}>
                    Weather Client
                </Typography>
            </Toolbar>
        </AppBar>
    )
}