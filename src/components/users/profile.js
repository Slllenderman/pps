import React, { useState } from "react"
import { ShoppingCartsList } from "../cardlists"
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react"
import { useCookies } from 'react-cookie'
import { logout } from "../../redux/userSlice"
import { logoutShCart } from "../../redux/shCartSlice"
import axios from "axios"

function Profile(){
    const providerId = useSelector((state) => state.user.provider)
    const providerName = useSelector((state) => state.user.providerName)
    const auth = useSelector((state) => state.user.isAuthorized)
    const token = useSelector((state) => state.user.token)
    const [cookie, setCookie, removeCookie] = useCookies(["auth"])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {if(!auth) navigate("/") }, [])
    let login = cookie.auth ? cookie.auth.login : ''

    const exitClick = () => {
        axios.post('auth/token/logout', {}, { "headers" : { "Authorization" : "token " + token }})
        .then((response) => {
            removeCookie('auth', {path:'/'})
            removeCookie('orders', {path:'/'})
            removeCookie('shCartDate', {path:'/'})
            removeCookie('shCartLocation', {path:'/'})
            dispatch( logout() )
            dispatch( logoutShCart() )
            navigate('/')
        }).catch((err) => console.log(err))
    }

    return(
        <>
        <div className="profile-container">
            <div className="profile-title">{"Профиль: " + login}</div>
            <div className="profile-Btns">
                { providerId > 0 ?
                    <button className="profile-providerBt" onClick={() => navigate(`/providerSite?provider=${providerId}&providerName=${providerName}`)}>
                        Профиль поставщика
                    </button>
                :
                    <button className="profile-providerBt" onClick={() => navigate("/providerReg")}>
                        Регистрация поставщика
                    </button>
                }
                <button className="profile-exitBt" onClick={() => exitClick()}>
                    Выйти
                </button>
            </div>
        </div>
        <ShoppingCartsList/>
        </>
    )
}

export default Profile