import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authorize, resetFastProviderRegistration } from '../../redux'

export function Authorization(){
    const [err, setErr] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    dispatch( resetFastProviderRegistration() )
    const confirmClick = () => {
        dispatch( authorize() )
        navigate(-1)
    }


    return(
        <div className="registration-back-container">
            <div className="registration-back">
                <div className="registration-container">
                    <div className="registration-title">Авторизация</div>
                    <div className="registration-label">Введите логин</div>
                    <input className="registration-textBlock" type="text"/>
                    <div className="registration-label">Введите пароль</div>
                    <input className="registration-textBlock" type="text"/>
                    {err ? <div className="registration-err">Ошибка логина или пароля</div> : null}
                    <button className="registration-confirm" onClick={() => confirmClick()}>Войти</button>
                </div>
            </div>
        </div>
)}

export function Registration(){
    const [err, setErr] = useState(false)
    const fastProviderRegistration = useSelector((state) => state.root.fastProviderRegistration)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const confirmClick = () => {
        dispatch( authorize() )
        if(fastProviderRegistration)
            navigate("/providerReg")
        else
            navigate(-1)
    }

    return(
        <div className="registration-back-container">
            <div className="registration-back">
                <div className="registration-container">
                    <div className="registration-title">Регистрация</div>
                    <div className="registration-label">Введите логин</div>
                    <input className="registration-textBlock" type="text"/>
                    <div className="registration-label">Введите пароль</div>
                    <input className="registration-textBlock" type="text"/>
                    {err ? <div className="registration-err">Введённый логин не подходит</div> : null}
                    <button className="registration-confirm" onClick={() => confirmClick()}>Подтвердить</button>
                </div>
            </div>
        </div>
)}

