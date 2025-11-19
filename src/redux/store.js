import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'

//REDUCERS
import loginUserReducer  from "./login/loginUserReducer";


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['loginUserReducer']
}

const appReducer = combineReducers({
    loginUserReducer: loginUserReducer
})

const rootReducer = (state, action) => {
    if (action.type.includes('loginUserReducer/logout/fulfilled')){
        console.log("entra al clear absoluto")
        storage.removeItem('persist:root')
        return appReducer(undefined, action)
    }

    return appReducer(state, action)
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    //middleware: [thunk]
})