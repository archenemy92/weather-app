import React, {useEffect} from "react"
import "./App.css"
import {Weather} from "./Components/Weather/Weather"
import {Header} from "./Components/Header/Header"
import {CircularProgress, Container} from "@material-ui/core"
import {useDispatch, useSelector} from "react-redux"
import {AppStateType} from "./Redux/store"
import {setInfo} from "./Redux/weatherReducer"
import {initApp} from "./Redux/appReducer"
import {FullInfo} from "./Components/Weather/FullInfo/FullInfo"
import {Redirect, Route, Switch} from "react-router-dom"

function App() {
    const initialize = useSelector<AppStateType, boolean>(state => state.app.initialize)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setInfo())
    }, [])

    useEffect(() => {
        dispatch(initApp())
    }, [initialize])

    if (!initialize) {
        return <div
            style={{position: "fixed", top: "30%", textAlign: "center", width: "100%"}}>
            <CircularProgress/>
        </div>
    }

    return (
        <Container className="App">
            <Header/>
            <Switch>
                <Route exact path={"/"} render={() => <Weather/>}/>
                <Route path={"/fullInfo"} render={() => <FullInfo/>}/>
                <Route path={"/404"} render={() => <h1>404: page not found</h1>}/>
                <Redirect from={"*"} to={"/404"}/>
            </Switch>
            <footer style={{backgroundColor: "hsl(183, 53%, 81%)", height:"20px"}}>

            </footer>
        </Container>
    )
}

export default App
