import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { useCookies } from 'react-cookie'
import { setProvider } from '../../redux/userSlice'
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
    const dispatch = useDispatch()
    useEffect(() => {if(!auth) navigate("/") }, [])

    const confirm = () => {
        axios.post(`/providers/?username=${cookie.auth.login}`, {
            name : nameField,
            location : locField,
            description : descField,
            photo : logoField
        }, { "headers" : { "Authorization" : "token " + token }})
        .then(response => {
            dispatch( setProvider({
                pk : response.data.pk,
                name : response.data.name
            })) 
            navigate(`/providerSite?provider=${response.data.pk}&providerName=${response.data.name}`)
        })
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
            <input type="file" className="registration-logo-add" onChange={(e) => setLogoField(e.target.file[0])}/>
            <button className="registration-confirm" onClick={() => confirm()}>Подтвердить</button>
        </div>
)}

export function ProductRegistration(){
    const [params, setParams] = useSearchParams()
    const token = useSelector((state) => state.user.token)
    const [nameField, setNameField] = useState('')
    const [priceField, setPriceField] = useState('')
    const [categoryField, setCategoryField] = useState('')
    const [descField, setDescField] = useState('')
    const [nameErr, setNameErr] = useState(false)
    const [priceErr, setPriceErr] = useState(false)
    const [categoryErr, setCategoryErr] = useState(false)
    const [descErr, setDescErr] = useState(false)
    const auth = useSelector((state) => state.user.isAuthorized)
    const navigate = useNavigate()
    useEffect(() => {if(!auth) navigate("/") }, [])

    const click = () => {
        axios.post(`/products/`, {
            name : nameField,
            price : priceField,
            category : categoryField,
            photo : undefined,
            description : descField,
            provider : params.get('provider')
        }, { "headers" : { "Authorization" : "token " + token }})
        .then(response => navigate(`/profile`))
        .catch(err => {
            const data = err.response.data
            if(data.name) setNameErr(true) 
            else setNameErr(false) 
            if(data.price) setPriceErr(true)
            else setPriceErr(false)
            if(data.category) setCategoryErr(true)
            else setCategoryErr(false)
            if(data.description) setDescErr(true)
            else setDescErr(false)
            console.log(err)
        })
    }

    return(
        <div className="registration-provider-container">
            <div className="registration-title">Регистрация товара</div>
            <div className="registration-label">Введите название</div>
            {nameErr ? <div className="shCart-err">Поле названия должно быть заполнено</div> : null }
            <input className="registration-textBlock" type="text" onChange={(e) => setNameField(e.target.value)}/>
            <div className="registration-label">Введите стоимость</div>
            {priceErr ? <div className="shCart-err">Поле стоимости должно быть заполнено</div> : null }
            <input className="registration-textBlock" type="text" onChange={(e) => setPriceField(e.target.value)}/>
            <div className="registration-label">Введите категорию товара</div>
            {categoryErr ? <div className="shCart-err">Поле категории должно быть заполнено</div> : null }
            <input className="registration-textBlock" type="text" onChange={(e) => setCategoryField(e.target.value)}/>
            <div className="registration-label">Добавьте описание</div>
            {descErr ? <div className="shCart-err">Поле описания должно быть заполнено</div> : null }
            <textarea className="registration-provider-description" onChange={(e) => setDescField(e.target.value)}/>
            <div className="registration-label">Добавьте фотографию</div>
            <input type="file" className="registration-logo-add"/>
            <button className="registration-confirm" onClick={() => click()}>Подтвердить</button>
        </div>
)}