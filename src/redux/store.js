import { configureStore } from '@reduxjs/toolkit'
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fastProviderRegistration : false,
    isAuthorized : false,
    isProvider : false,
    shCartDate : "",
    shCartLocation : "",
    actualShCart : -1
}

const storeSlice = createSlice({
    name: 'store',
    initialState: initialState,
    reducers: {
        setFastProviderRegistration(state){
            state.fastProviderRegistration = true
        },

        resetFastProviderRegistration(state){
            state.fastProviderRegistration = false
        },

        authorize(state){
            state.isAuthorized = true
        },


        setProvider(state){
            state.isProvider = true
        }
        
    }
})

const store = configureStore({
    reducer: {  
        storeSlice
    }
})

export default configureStore