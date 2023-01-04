import { createSlice } from "@reduxjs/toolkit";
import { useCookies } from "react-cookie";

const initialState = {
    date : "",
    location : "",
    orders : {},
    sum : 0,
    req : false
}

const shCartSlice = createSlice({
    name: 'shcart',
    initialState,
    reducers: {
        setDate(state, action){
            state.date = action.payload
        },

        setLocation(state, action){
            state.location = action.payload
        },

        initOrders(state, action){
            state.orders = action.payload
            state.sum = 0
            for(const[key, value] of Object.entries(state.orders))
                state.sum += value.quantity * value.product.price
        },

        setOrder(state, action){
            if(action.payload.quantity == 0)
                delete state.orders[action.payload.product.pk]
            else
                state.orders[action.payload.product.pk] = {
                    quantity : action.payload.quantity,
                    product : action.payload.product
                }
            state.sum = 0
            for(const[key, value] of Object.entries(state.orders))
                state.sum += value.quantity * value.product.price
        },

        setReqReload(state, action){
            state.req = action.payload
        },

        logoutShCart(state){
            state.orders = {}
            state.location = ''
            state.date = '' 
        }
    }
})

export const {
    setDate,
    setLocation,
    setOrder,
    initOrders,
    logoutShCart,
    setReqReload
} = shCartSlice.actions

export default shCartSlice