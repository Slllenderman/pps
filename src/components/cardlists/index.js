import { ProductsCardsList, UsersCardsList, ShCartCardsList, ProviderOrdersList } from './listblocks'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import qs from 'qs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function TransformProdTitle(paramTitle){
    switch(paramTitle){
        case "clothes":
            return "одежда, обувь и аксессуары"
        case "meals":
            return "продукты питания и напитки"
        case "repairs":
            return "строительство и ремонт"
        case "materials":
            return "сырьё и материалы"
        case "kids":
            return "товары для детей, игрушки"
        case "countries":
            return "дом, дача, сад"
        case "gifts":
            return "подарки, сувениры"
        case "appliances":
            return "электроника, бытовая техника"
        case "furnitures":
            return "мебель"
        case "equipments":
            return "промышленное оборудование"
        case "cars":
            return "автозапчасти и автомобили"
        case "medicine":
            return "медицина и здоровье"
        case "cosmetic":
            return "косметика и гигиена"
        case "sport":
            return "спорт, охота, туризм"
        case "animals":
            return "животные и растения"
        case "books":
            return "книги и канцелярия"
        case "music":
            return "Музыка и творчество"
        default:
            return "Все категроии"

    }
}

export function ProductsList({titleVisability, providerView}){
    const [params, setParams] = useSearchParams()
    const title = TransformProdTitle(params.get("category"))

    const [maxPriceField, setMaxPriceField] = useState()
    const [minPriceField, setMinPriceField] = useState()
    const [nameField, setNameField] = useState()
    const [properties, setProperties] = useState({ 
        category : params.get("category"), 
        provider: params.get("provider") 
    })

    const searchClick = () => {
        setProperties({
            category : params.get("category"),
            name : nameField,
            price_min : minPriceField,
            price_max : maxPriceField,
            provider :params.get("provider"),
        })
    }


    return (
        <div className="list">
            { titleVisability ? <div className="list-title">{"Список товаров по категории: " + title}</div> : <></>}
            <div className="list-filter">  
                <div>
                    <div className="list-filter-title">Найти</div>
                    <input type="text" className="list-filter-textblock-find" 
                    onChange={ (event) => setNameField(event.target.value)}/>
                </div>
                <div>
                    <div className="list-filter-price">
                        <span className="list-filter-price-title">От</span>
                        <input type="text" className="list-filter-textblock-price"
                        onChange={ (event) => setMinPriceField(event.target.value) }/>
                    </div>
                    <div className="list-filter-price">
                        <span className="list-filter-price-title">До</span>
                        <input type="text" className="list-filter-textblock-price"
                        onChange={ (event) => setMaxPriceField(event.target.value)}/>
                    </div>
                </div>
                <div className="list-filter-search-container">
                    <button className="list-filter-search" onClick={ () => searchClick() }>Поиск</button>
                </div>
            </div>
            <ProductsCardsList filterProperties={qs.stringify(properties)} providerView={providerView}/>
        </div>
)}

export function ProvidersList(){
    const [params, setParams] = useSearchParams()
    const title = TransformProdTitle(params.get("category"))
    const [locationField, setLocationField] = useState() 
    const [nameField, setNameField] = useState()
    let defaultParams
    if(params.get("category") == null)
        defaultParams = {
            name : nameField,
            location : locationField
        }
    else
        defaultParams = {
            category : params.get("category"),
            name : nameField,
            location : locationField
        }
    const [properties, setProperties] = useState(defaultParams)

    const searchClick = () => {
        if(params.get("category") != null)
            setProperties({
                category : params.get("category"),
                name : nameField,
                location : locationField
            })
        else
            setProperties({
                name : nameField,
                location : locationField
            })
    } 
    return (
        <div className="list">
            <div className="list-title">{"Список товаров по категории: " + title}</div>
            <div className="list-filter">
                <div>
                    <div className="list-filter-title">Найти</div>
                    <input type="text" onChange={(event) => setNameField(event.target.value)} className="list-filter-textblock-find"/>
                </div>
                <div>
                    <div className="list-filter-price">
                        <span className="list-filter-price-title">Город</span>
                        <input type="text" onChange={(event) => setLocationField(event.target.value)} className="list-filter-textblock-price"/>
                    </div>
                </div>
                <div className="list-filter-search-container">
                    <button onClick={() => searchClick()} className="list-filter-search">Поиск</button>
                </div>
            </div>
            <UsersCardsList filterProperties={qs.stringify(properties)}/>
        </div>
)}

export function ShoppingCartsList({ titleVisability }){
    const [params, setParams] = useSearchParams()
    const [cookie, setCookie] = useCookies(["auth"])
    const [dateField, setDateField] = useState() 
    const [locationField, setLocationField] = useState()
    const [idField, setIdField] = useState()
    const [properties, setProperties] = useState({ username : cookie.auth?.login })

    const searchClick = () => {
        if(cookie.auth)
            setProperties({
                id : idField,
                date : dateField,
                location : locationField,
                username : cookie.auth.login
            })
    }

    return (
        <div className="list">
            { titleVisability ? <div className="list-title">Список товаров заказов</div> : null}
            <div className="list-filter">
                <div>
                    <div className="list-filter-title">Поиск по номеру</div>
                    <input type="text" className="list-filter-textblock-find" 
                    onChange={ (event) => setIdField(event.target.value) }/>
                </div>
                <div>
                    <div className="list-filter-price">
                        <span className="list-filter-price-title">Дата</span>
                        <input type="text" className="list-filter-textblock-price"
                        onChange={ (event) => setDateField(event.target.value) }/>
                    </div>
                    <div className="list-filter-price">
                        <span className="list-filter-price-title">Место</span>
                        <input type="text" className="list-filter-textblock-price"
                        onChange={ (event) => setLocationField(event.target.value) }/>
                    </div>
                </div>
                <div className="list-filter-search-container">
                    <button className="list-filter-search" onClick={ () => searchClick() }>Поиск</button>
                </div>
            </div>
            <ShCartCardsList filterProperties={qs.stringify(properties)}/>
        </div>
)}

export function ProviderOffersList(){
    const auth = useSelector((state) => state.user.isAuthorized)
    const navigate = useNavigate()
    const [params, setParams] = useSearchParams()
    useEffect(() => {if(!auth) navigate("/") }, [])

    const [dateField, setDateField] = useState() 
    const [locationField, setLocationField] = useState()
    const [idField, setIdField] = useState()
    const [status, setStatus] = useState()
    const [properties, setProperties] = useState({ provider : params.get('provider')})

    const searchClick = () => {
            setProperties({
                id : idField,
                date : dateField,
                location : locationField,
                state : status,
                provider : params.get('provider')
            })
    }

    const TransformStatus = (value) => {
        const status = value.toLowerCase()
        if(status == '') return undefined
        else if("обработка".startsWith(status)) return "P"
        else if("принято".startsWith(status)) return "A"
        else if("отклонено".startsWith(status)) return "R"
        else return 'N'
    }

    return(
        <div>
            <div className="list">
                <div className="list-title">Список заказов</div>
                <div className="list-filter">
                    <div>
                        <div className="list-filter-title">Поиск по номеру</div>
                        <input type="text" className="list-filter-textblock-find" 
                        onChange={ (event) => setIdField(event.target.value) }/>
                    </div>
                    <div>
                        <div className="list-filter-price">
                            <span className="list-filter-price-title">Дата</span>
                            <input type="text" className="list-filter-textblock-price"
                            onChange={ (event) => setDateField(event.target.value) }/>
                        </div>
                        <div className="list-filter-price">
                            <span className="list-filter-price-title">Место</span>
                            <input type="text" className="list-filter-textblock-price"
                            onChange={ (event) => setLocationField(event.target.value) }/>
                        </div>
                        <div className="list-filter-price">
                            <span className="list-filter-price-title">Статус</span>
                            <input type="text" className="list-filter-textblock-price"
                            onChange={ (event) => setStatus( TransformStatus(event.target.value) ) }/>
                        </div>
                    </div>
                    <div className="list-filter-search-container">
                        <button className="list-filter-search" onClick={ () => searchClick() }>Поиск</button>
                    </div>
                </div>
            </div>
            <ProviderOrdersList filterProperties={qs.stringify(properties)}/> 
        </div>
)}
