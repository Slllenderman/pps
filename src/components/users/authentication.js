import React, { useContext, useState } from 'react'

export function Authorization(){
    const [err, setErr] = useState(false)
    
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
                    <button className="registration-confirm">Войти</button>
                </div>
            </div>
        </div>
)}

export function Registration(){
    const [err, setErr] = useState(false)

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
                    <button className="registration-confirm">Подтвердить</button>
                </div>
            </div>
        </div>
)}

