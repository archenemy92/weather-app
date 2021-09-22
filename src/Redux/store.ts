import {applyMiddleware, combineReducers, createStore} from "redux"
import thunk, {ThunkAction} from "redux-thunk"
import {appReducer} from "./appReducer"
import {weatherReducer} from "./weatherReducer"
import {fullInfoReducer} from "./fullInfoReducer"

export type AppStateType = ReturnType<typeof rootReducer>
export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, any>

const rootReducer = combineReducers({
    app: appReducer,
    weatherPage: weatherReducer,
    fullPage: fullInfoReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
//@ts-ignore
window.store = store.getState()