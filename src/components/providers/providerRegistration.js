import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { useCookies } from 'react-cookie'
import axios from 'axios'

export function ProviderRegistration(){
    const[nameErr,  setNameErr] = useState(false)
    const[locErr,  setLocErr] = useState(false)
    const[descErr,  setDescErr] = useState(false)
    const[logoErr,  setLogoErr] = useState(false)
    const[nameField, setNameField] = useState()
    const[locField, setLocField] = useState()
    const[descField, setDescField] = useState()
    const[logoField, setLogoField] = useState()
    
    const auth = useSelector((state) => state.user.isAuthorized)
    const token = useSelector((state) => state.user.token)
    const [cookie, setCookie] = useCookies(['auth'])
    const navigate = useNavigate()
    useEffect(() => {if(!auth) navigate("/") }, [])

    const confirm = () => {
        axios.post(`/providers/?username=${cookie.auth.login}`, {
            name : nameField,
            location : locField,
            description : descField,
            photo : logoField
        }, { "headers" : { "Authorization" : "token " + token }})
        .then(response => navigate(`/providerSite?provider=${response.pk}&providerName=${response.name}`))
        .catch(err => {
            const data = err.response.data
            if(data.name) setNameErr(true) 
            else setNameErr(false) 
            if(data.location) setLocErr(true)
            else setLocErr(false)
            if(data.description) setDescErr(true)
            else setDescErr(false)
            if(data.photo) setLogoErr(true)
            else setLogoErr(false)
            console.log(err)
        })
    }

    return(
        <div className="registration-provider-container">
            <div className="registration-title">Регистрация поставщика</div>
            <div className="registration-label">Введите название компании</div>
            {nameErr ? <div className="shCart-err">Поле названия компании должно быть заполнено</div> : null }
            <input className="registration-textBlock" type="text" onChange={(e) => setNameField(e.target.value)}/>
            <div className="registration-label">Введите расположение вашей компании</div>
            {locErr ? <div className="shCart-err">Поле локации компании должно быть заполнено</div> : null }
            <input className="registration-textBlock" type="text" onChange={(e) => setLocField(e.target.value)}/>
            <div className="registration-label">Добавьте описание</div>
            {descErr ? <div className="shCart-err">Поле описания должно быть заполнено</div> : null }
            <textarea className="registration-provider-description" onChange={(e) => setDescField(e.target.value)}/>
            <div className="registration-label">Добавьте логотип</div>
            {logoErr ? <div className="shCart-err">Необходимо добавить логотип</div> : null }
            <input type="file" className="registration-logo-add" onChange={(e) => setLogoField(e.target.value)}/>
            <button className="registration-confirm" onClick={() => confirm()}>Подтвердить</button>
        </div>
)}

export function ProductRegistration(){
    const auth = useSelector((state) => state.root.isAuthorized)
    const navigate = useNavigate()
    useEffect(() => {if(!auth) navigate("/") }, [])
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