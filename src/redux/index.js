import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import shCartSlice from './shCartSlice'

const store = configureStore({
    reducer: {  
        user: userSlice.reducer,
        cart : shCartSlice.reducer
    }
})

export default store