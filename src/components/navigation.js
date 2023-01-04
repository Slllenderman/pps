import box from '../static/box.svg'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { authorize, setProvider, setToken } from '../redux/userSlice'
import { initOrders, setLocation, setDate } from '../redux/shCartSlice'
import { Breadcrumbs } from 'react-breadcrumbs-dynamic'

function Navigation(){
    const authorized = useSelector((state) => state.user.isAuthorized )
    const [cookie, setCookie, removeCookie] = useCookies(["auth", "orders"])
    const dispatch = useDispatch()
    
    useEffect(()=> {
        if(cookie.auth)
            axios.post('/auth/token/login/', {
                username: cookie.auth.login,
                password: cookie.auth.password
            }).then(response =>{ 
                dispatch( setToken(response.data.auth_token) )
                dispatch( authorize() )
                if(cookie.orders) dispatch( initOrders(cookie.orders) )
                if(cookie.shCartDate) dispatch( setDate(cookie.shCartDate) )
                if(cookie.shCartLocation) dispatch( setLocation(cookie.shCartLocation) )
                axios.get(`/providers?username=${cookie.auth.login}`,{ 
                    "headers" : { 
                        "Authorization" : "token " + response.data.auth_token 
                    }
                }).then(response => {
                    if(response.data.length != 0)
                        dispatch(setProvider({
                            pk : response.data[0].pk,
                            name : response.data[0].name
                        }
                    ))
                }).catch(err => console.log(err)) 
            })
            .catch(error => removeCookie("auth", {path:"/"}))
    },[])

    return (
    <>
    <div className="header-navigation-container">
        <Link to="/">
            <img className="header-navigation-logo" src={box}/>
        </Link>
        <div className="header-navigation">
            <Link to="/" className="header-navigation-title">
                ОптЛист
            </Link>
            <div className="header-navigation-leftpart">
                <Link className="header-navigation-leftpart-link" to="/providers/categories">Поставщики</Link>
                <Link className="header-navigation-leftpart-link" to="/products/categories">Товары</Link>
            </div>
            <div className="header-navigation-rightpart">
                { !authorized ?
                    <Link to="/registration" className="header-navigation-rightpart-link"> 
                        <svg className="header-navigation-rightpart-image" viewBox="0 0 200 200"><g transform="matrix(1, 0, 0, 1, 163.514496, 125.113022)"/> <g transform="matrix(1, 0, 0, 1, 163.514496, 125.113022)"/><g transform="matrix(1, 0, 0, 1, 163.514496, 125.113022)"/><g transform="matrix(1, 0, 0, 1, 163.514496, 125.113022)"/><g transform="matrix(1, 0, 0, 1, 163.514496, 125.113022)"/><g transform="matrix(1, 0, 0, 1, 163.514496, 125.113022)"/><g transform="matrix(1, 0, 0, 1, 163.514496, 125.113022)"/><g transform="matrix(1, 0, 0, 1, 163.514496, 125.113022)"/><g transform="matrix(1, 0, 0, 1, 163.514496, 125.113022)"/><g transform="matrix(1, 0, 0, 1, 163.514496, 125.113022)"/><g transform="matrix(1, 0, 0, 1, 163.514496, 125.113022)"/><g transform="matrix(1, 0, 0, 1, 163.514496, 125.113022)"/><g transform="matrix(1, 0, 0, 1, 163.514496, 125.113022)"/><g transform="matrix(1, 0, 0, 1, 163.514496, 125.113022)"/><g transform="matrix(1, 0, 0, 1, 163.514496, 125.113022)"/><g transform="matrix(3.082129, 0, 0, 2.852757, 216.419617, 207.312958)"/><g transform="matrix(3.082129, 0, 0, 2.852757, 216.419617, 207.312958)"/><g transform="matrix(3.082129, 0, 0, 2.852757, 216.419617, 207.312958)"/><g transform="matrix(3.082129, 0, 0, 2.852757, 216.419617, 207.312958)"/><g transform="matrix(3.082129, 0, 0, 2.852757, 216.419617, 207.312958)"/><g transform="matrix(3.082129, 0, 0, 2.852757, 216.419617, 207.312958)"/><g transform="matrix(3.082129, 0, 0, 2.852757, 216.419617, 207.312958)"/><g transform="matrix(3.082129, 0, 0, 2.852757, 216.419617, 207.312958)"/><g transform="matrix(3.082129, 0, 0, 2.852757, 216.419617, 207.312958)"/><g transform="matrix(3.082129, 0, 0, 2.852757, 216.419617, 207.312958)"/><g transform="matrix(3.082129, 0, 0, 2.852757, 216.419617, 207.312958)"/><g transform="matrix(3.082129, 0, 0, 2.852757, 216.419617, 207.312958)"/><g transform="matrix(3.082129, 0, 0, 2.852757, 216.419617, 207.312958)"/><g transform="matrix(3.082129, 0, 0, 2.852757, 216.419617, 207.312958)"/><g transform="matrix(3.082129, 0, 0, 2.852757, 216.419617, 207.312958)"/><path d="M 170 90.8 L 109.2 90.8 L 109.2 33 C 109.2 28 105 25 100 25 C 95 25 90.8 28 90.8 33 L 90.8 90.8 L 33 90.8 C 29 90.8 25 95 25 100 C 25 105 28 109.2 33 109.2 L 90.9 109.2 L 90.8 167 C 90.8 172 95 175 100 175 C 105 175 109.2 172 109.2 167 L 109.2 109.2 L 170 109.2 C 174 109.2 178 105 178 100 C 178 95 174 90.8 170 90.8 Z"/><g transform="matrix(1, 0, 0, 1, 433.562967, 224.358336)"/><g transform="matrix(1, 0, 0, 1, 433.562967, 224.358336)"/><g transform="matrix(1, 0, 0, 1, 433.562967, 224.358336)"/><g transform="matrix(1, 0, 0, 1, 433.562967, 224.358336)"/><g transform="matrix(1, 0, 0, 1, 433.562967, 224.358336)"/><g transform="matrix(1, 0, 0, 1, 433.562967, 224.358336)"/><g transform="matrix(1, 0, 0, 1, 433.562967, 224.358336)"/><g transform="matrix(1, 0, 0, 1, 433.562967, 224.358336)"/><g transform="matrix(1, 0, 0, 1, 433.562967, 224.358336)"/><g transform="matrix(1, 0, 0, 1, 433.562967, 224.358336)"/><g transform="matrix(1, 0, 0, 1, 433.562967, 224.358336)"/><g transform="matrix(1, 0, 0, 1, 433.562967, 224.358336)"/><g transform="matrix(1, 0, 0, 1, 433.562967, 224.358336)"/><g transform="matrix(1, 0, 0, 1, 433.562967, 224.358336)"/><g transform="matrix(1, 0, 0, 1, 433.562967, 224.358336)"/><g transform="matrix(0.292969, 0, 0, 0.336044, 208.9384, 13.814219)"/><g transform="matrix(0.292969, 0, 0, 0.336044, 208.9384, 13.814219)"/><g transform="matrix(0.292969, 0, 0, 0.336044, 208.9384, 13.814219)"/><g transform="matrix(0.292969, 0, 0, 0.336044, 208.9384, 13.814219)"/><g transform="matrix(0.292969, 0, 0, 0.336044, 208.9384, 13.814219)"/><g transform="matrix(0.292969, 0, 0, 0.336044, 208.9384, 13.814219)"/><g transform="matrix(0.292969, 0, 0, 0.336044, 208.9384, 13.814219)"/><g transform="matrix(0.292969, 0, 0, 0.336044, 208.9384, 13.814219)"/><g transform="matrix(0.292969, 0, 0, 0.336044, 208.9384, 13.814219)"/><g transform="matrix(0.292969, 0, 0, 0.336044, 208.9384, 13.814219)"/><g transform="matrix(0.292969, 0, 0, 0.336044, 208.9384, 13.814219)"/><g transform="matrix(0.292969, 0, 0, 0.336044, 208.9384, 13.814219)"/><g transform="matrix(0.292969, 0, 0, 0.336044, 208.9384, 13.814219)"/><g transform="matrix(0.292969, 0, 0, 0.336044, 208.9384, 13.814219)"/><g transform="matrix(0.292969, 0, 0, 0.336044, 208.9384, 13.814219)"/></svg>                         
                        Регистрация
                    </Link>
                :
                    <Link to="/shoppingCart" className="header-navigation-rightpart-link"> 
                        <svg className="header-navigation-rightpart-image" viewBox="0 0 459.529 459.529"><g><g><path d="M17,55.231h48.733l69.417,251.033c1.983,7.367,8.783,12.467,16.433,12.467h213.35c6.8,0,12.75-3.967,15.583-10.2l77.633-178.5c2.267-5.383,1.7-11.333-1.417-16.15c-3.117-4.817-8.5-7.65-14.167-7.65H206.833c-9.35,0-17,7.65-17,17s7.65,17,17,17H416.5l-62.9,144.5H164.333L94.917,33.698c-1.983-7.367-8.783-12.467-16.433-12.467H17c-9.35,0-17,7.65-17,17S7.65,55.231,17,55.231z"/><path d="M135.433,438.298c21.25,0,38.533-17.283,38.533-38.533s-17.283-38.533-38.533-38.533S96.9,378.514,96.9,399.764S114.183,438.298,135.433,438.298z"/><path d="M376.267,438.298c0.85,0,1.983,0,2.833,0c10.2-0.85,19.55-5.383,26.35-13.317c6.8-7.65,9.917-17.567,9.35-28.05c-1.417-20.967-19.833-37.117-41.083-35.7c-21.25,1.417-37.117,20.117-35.7,41.083C339.433,422.431,356.15,438.298,376.267,438.298z"/></g></g></svg>
                        Корзина
                    </Link>
                }
                { !authorized ?
                    <Link to="/authorization" className="header-navigation-rightpart-link">
                        <svg className="header-navigation-rightpart-image" viewBox="0 0 562 512"> <path d="M321.629,446.371c-63.337,0-122.346-31.371-157.846-83.916c-7.196-10.651-4.395-25.117,6.254-32.313 c10.651-7.196,25.117-4.394,32.312,6.256c26.835,39.717,71.424,63.429,119.28,63.429c79.305,0,143.826-64.521,143.826-143.826 c0-79.307-64.521-143.826-143.826-143.826c-47.999,0-92.661,23.819-119.471,63.714c-7.168,10.668-21.628,13.506-32.296,6.335 c-10.668-7.17-13.504-21.628-6.336-32.296c35.472-52.785,94.575-84.298,158.103-84.298C426.599,65.629,512,151.028,512,256 C512,360.97,426.599,446.371,321.629,446.371z"/> <path d="M368.428,268.94c0.092-0.133,0.164-0.278,0.251-0.414c0.324-0.504,0.639-1.013,0.925-1.542 c0.053-0.099,0.096-0.206,0.149-0.307c0.295-0.574,0.579-1.154,0.827-1.753c0.028-0.068,0.048-0.141,0.078-0.209 c0.256-0.631,0.49-1.272,0.69-1.93c0.023-0.076,0.037-0.157,0.059-0.233c0.191-0.647,0.362-1.3,0.495-1.969 c0.037-0.192,0.056-0.388,0.09-0.58c0.096-0.554,0.194-1.108,0.248-1.676c0.079-0.77,0.118-1.544,0.118-2.323 c0-0.78-0.039-1.556-0.118-2.324c-0.054-0.56-0.152-1.108-0.245-1.655c-0.036-0.2-0.053-0.403-0.093-0.602 c-0.132-0.659-0.301-1.305-0.489-1.942c-0.025-0.085-0.039-0.174-0.065-0.259c-0.199-0.647-0.43-1.278-0.681-1.902 c-0.033-0.078-0.056-0.16-0.088-0.237c-0.245-0.59-0.524-1.162-0.815-1.727c-0.057-0.11-0.102-0.225-0.161-0.334 c-0.278-0.518-0.588-1.016-0.903-1.51c-0.095-0.147-0.174-0.303-0.272-0.448c-0.313-0.467-0.658-0.911-1.002-1.353 c-0.121-0.157-0.23-0.323-0.355-0.478c-0.484-0.588-0.995-1.153-1.531-1.69l-69.813-69.815c-9.087-9.089-23.823-9.089-32.912,0 c-9.089,9.087-9.089,23.823,0,32.912l30.09,30.09H23.273C10.42,232.729,0,243.149,0,256.002s10.42,23.273,23.273,23.273h269.628 l-30.09,30.088c-9.089,9.089-9.089,23.823,0,32.912c4.544,4.544,10.501,6.817,16.457,6.817c5.955,0,11.912-2.273,16.455-6.817 l69.813-69.813c0.54-0.538,1.049-1.102,1.533-1.691c0.116-0.143,0.217-0.296,0.33-0.442 C367.755,269.875,368.107,269.419,368.428,268.94z"/></svg>
                        Войти
                    </Link>
                :
                    <Link to="/profile" className="header-navigation-rightpart-link">
                        <svg className="header-navigation-rightpart-image" viewBox="0 0 32 32"><g><path d="M16,16A7,7,0,1,0,9,9,7,7,0,0,0,16,16ZM16,4a5,5,0,1,1-5,5A5,5,0,0,1,16,4Z"/><path d="M17,18H15A11,11,0,0,0,4,29a1,1,0,0,0,1,1H27a1,1,0,0,0,1-1A11,11,0,0,0,17,18ZM6.06,28A9,9,0,0,1,15,20h2a9,9,0,0,1,8.94,8Z"/></g></svg>
                        Аккаунт
                    </Link>
                }
            </div>
        </div>
    </div>
    <Breadcrumbs/>
    </>
)}



export default Navigation