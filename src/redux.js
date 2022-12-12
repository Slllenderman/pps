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

const slice = createSlice({
    name: 'store',
    initialState,
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
        },

        setShCartDate(state, action){
            state.shCartDate = action.payload
        },

        setShCartLocation(state, action){
            state.shCartLocation = action.payload
        }
    }
})

export const {
            setFastProviderRegistration, 
            resetFastProviderRegistration,
            authorize,
            setProvider,
            setShCartDate,
            setShCartLocation
} = slice.actions

const store = configureStore({
    reducer: {  
        root: slice.reducer
    }
})

export default store