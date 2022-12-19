import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'
import { authorize, resetFastProviderRegistration, setToken, setProvider } from '../../redux/userSlice'
import { initOrders } from '../../redux/shCartSlice'
import axios from 'axios'

export function Authorization(){
    const [err, setErr] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate() 
    const [cookie, setCookie] = useCookies(["auth"])
    const [loginField, setloginField] = useState('')
    const [passwField, setpasswField] = useState('')
    dispatch( resetFastProviderRegistration() )

    const confirmClick = () => {
        axios.post('/auth/token/login/', {
            username: loginField,
            password: passwField
        }).then(response =>{
            setCookie("auth", {
                login: loginField,
                password: passwField
            }, {path: "/"})
            dispatch( setToken(response.data.auth_token) )
            dispatch( authorize() )
            if(cookie.orders) dispatch( initOrders(cookie.orders) )
            axios.get(`/providers?username=${loginField}`,{ 
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
            navigate('/')
        }).catch(error => {
            setErr(true)
            console.log(error)
        })
    }

    return(
        <div className="registration-back-container">
            <div className="registration-back">
                <div className="registration-container">
                    <div className="registration-title">Авторизация</div>
                    <div className="registration-label">Введите логин</div>
                    <input className="registration-textBlock" onChange={(e) => setloginField(e.target.value)} type="text"/>
                    <div className="registration-label">Введите пароль</div>
                    <input className="registration-textBlock" onChange={(e) => setpasswField(e.target.value)} type="password"/>
                    {err ? <div className="registration-err">Ошибка аутентефикации</div> : null}
                    <button className="registration-confirm" onClick={() => confirmClick()}>Войти</button>
                </div>
            </div>
        </div>
)}


function GetErrTitle(err){
    const data = err.response.data
            if(data.username){
                if(data.username[0] == 'This field may not be blank.')
                    return 'Поле логина должно быть заполнено'
                if(data.username[0] == 'Enter a valid username. This value may contain only letters, numbers, and @/./+/-/_ characters.')
                    return 'Логин содержит недопустимые символы'
                if(data.username[0] == 'A user with that username already exists.') 
                    return 'Данный логин уже существует'
            } else 
            if(data.password) {
                if(data.password[0] == 'This field may not be blank.')
                    return 'Поле пароля должно быть заполнено'
                if(data.password[0] == 'This password is too short. It must contain at least 8 characters.')
                    return 'Данный пароль слишком короткий'
            }
}

export function Registration(){
    const [err, setErr] = useState({
        isErr : false,
        title : ''
    })
    const [loginField, setloginField] = useState('')
    const [passwField, setpasswField] = useState('')
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate() 
    const [cookie, setCookie] = useCookies()
    
    dispatch( resetFastProviderRegistration() )

    const confirmClick = () => {
        axios.post('/auth/users/', {
            username: loginField,
            password: passwField
        }).then(response => {
            axios.post('/auth/token/login/', {
                username: loginField,
                password: passwField
            }).then(response => {
                setCookie("auth", {
                    login: loginField,
                    password: passwField
                }, {path: "/"})
                dispatch( setToken(response.data.auth_token) )
                dispatch( authorize() )
                axios.get(`/providers?username=${loginField}`,{ 
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
                if(user.fastProviderRegistration)
                    navigate('/providerReg')
                else
                    navigate('/')
            }).catch(error => console.log(error))
        }).catch(err => {
            setErr({
                isErr : true,
                title : GetErrTitle(err)
            })
        })
    }

    return(
        <div className="registration-back-container">
            <div className="registration-back">
                <div className="registration-container">
                    <div className="registration-title">Регистрация</div>
                    <div className="registration-label">Введите логин</div>
                    <input className="registration-textBlock" onChange={(e) => setloginField(e.target.value)} type="text"/>
                    <div className="registration-label">Введите пароль</div>
                    <input className="registration-textBlock" onChange={(e) => setpasswField(e.target.value)} type="password"/>
                    {err.isErr ? <div className="registration-err">{err.title}</div> : null}
                    <button className="registration-confirm" onClick={() => confirmClick()}>Подтвердить</button>
                </div>
            </div>
        </div>
)}

