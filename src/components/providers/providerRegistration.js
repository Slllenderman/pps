import { useState } from "react"

export function ProviderRegistration(){
    return(
        <div className="registration-provider-container">
            <div className="registration-title">Регистрация поставщика</div>
            <div className="registration-label">Введите название компании</div>
            <input className="registration-textBlock" type="text"/>
            <div className="registration-label">Введите расположение вашей компании</div>
            <input className="registration-textBlock" type="text"/>
            <div className="registration-label">Добавьте описание</div>
            <input className="registration-provider-description" type="text"/>
            <div className="registration-label">Добавьте логотип</div>
            <input type="file" className="registration-logo-add"/>
            <button className="registration-confirm">Подтвердить</button>
        </div>
)}

export function ProductRegistration(){
    return(
        <div className="registration-provider-container">
            <div className="registration-title">Регистрация товара</div>
            <div className="registration-label">Введите название</div>
            <input className="registration-textBlock" type="text"/>
            <div className="registration-label">Введите стоимость</div>
            <input className="registration-textBlock" type="text"/>
            <div className="registration-label">Введите категорию товара</div>
            <input className="registration-textBlock" type="text"/>
            <div className="registration-label">Добавьте фотографию</div>
            <input type="file" className="registration-logo-add"/>
            <button className="registration-confirm">Подтвердить</button>
        </div>
)}