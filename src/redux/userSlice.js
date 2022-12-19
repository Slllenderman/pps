import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fastProviderRegistration : false,
    isAuthorized : false,
    provider : -1,
    providerName : "",
    token : ""
}

const userSlice = createSlice({
    name: 'user',
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

        logout(state){
            state.isAuthorized = false
            state.provider = -1
            state.providerName = ''
            state.token = ''
        },

        setToken(state, action){
            state.token = action.payload
        },

        setProvider(state, action){
            state.provider = action.payload.pk
            state.providerName = action.payload.name
        }
    }
})

export const {
            setFastProviderRegistration, 
            resetFastProviderRegistration,
            authorize,
            setToken,
            logout,
            setProvider
} = userSlice.actions

export default userSlice