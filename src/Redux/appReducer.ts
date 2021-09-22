import {ThunkType} from "./store"

type appReducerStateType = {
    initialize: boolean
}
export type SetInitializeType = ReturnType<typeof setInitialize>
export type AppReducerActionsType = SetInitializeType

const initState: appReducerStateType = {
    initialize: false
}

export const appReducer = (state = initState, action: AppReducerActionsType): appReducerStateType => {
    switch (action.type) {
        case "INITIALIZE_APP": {
            return {
                ...state,
                initialize: true
            }

        }
        default: {
            return state
        }
    }
}

export const setInitialize = () => {
    return {
        type: "INITIALIZE_APP"
    } as const
}

export const initApp = (): ThunkType =>
    async (dispatch) => {
        setTimeout(() => {
            dispatch(setInitialize())
        }, 3000)
    }