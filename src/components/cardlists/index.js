import { ProductsCardsList, UsersCardsList } from './ListBlocks'
import { useSearchParams } from 'react-router-dom'
import qs from 'qs'
import { useState } from 'react'

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

    let maxCostField, minCostField, nameField
    const [properties, setProperties] = useState({ category : params.get("category") })

    const searchClick = () => {
        setProperties({
            category : params.get("category"),
            name : nameField,
            cost_min : minCostField,
            cost_max : maxCostField,
            provider : params.get("provider")
        })
    }

    return (
        <div className="list">
            { titleVisability ? <div className="list-title">{"Список товаров по категории: " + title}</div> : <></>}
            <div className="list-filter">
                <div>
                    <div className="list-filter-title">Найти</div>
                    <input type="text" className="list-filter-textblock-find" 
                    onChange={ (event) => nameField = event.target.value }/>
                </div>
                <div>
                    <div className="list-filter-price">
                        <span className="list-filter-price-title">От</span>
                        <input type="text" className="list-filter-textblock-price"
                        onChange={ (event) => minCostField = event.target.value }/>
                    </div>
                    <div className="list-filter-price">
                        <span className="list-filter-price-title">До</span>
                        <input type="text" className="list-filter-textblock-price"
                        onChange={ (event) => maxCostField = event.target.value }/>
                    </div>
                </div>
                <button className="list-filter-search" onClick={ () => searchClick() }>Поиск</button>
            </div>
            <ProductsCardsList filterProperties={qs.stringify(properties)} providerView={providerView}/>
        </div>
)}

export function ProvidersList(){
    const [params, setParams] = useSearchParams()
    const title = TransformProdTitle(params.get("category"))
    let cityField, nameField

    let defaultParams
    if(params.get("category") == null)
        defaultParams = {
            name : nameField,
            city : cityField
        }
    else
        defaultParams = {
            category : params.get("category"),
            name : nameField,
            city : cityField
        }
    const [properties, setProperties] = useState(defaultParams)

    const searchClick = () => {
        if(params.get("category") != null)
            setProperties({
                category : params.get("category"),
                name : nameField,
                city : cityField
            })
        else
            setProperties({
                name : nameField,
                city : cityField
            })
    } 
    return (
        <div className="list">
            <div className="list-title">{"Список товаров по категории: " + title}</div>
            <div className="list-filter">
                <div>
                    <div className="list-filter-title">Найти</div>
                    <input type="text" onChange={(event) => nameField = event.target.value} className="list-filter-textblock-find"/>
                </div>
                <div>
                    <div className="list-filter-price">
                        <span className="list-filter-price-title">Город</span>
                        <input type="text" onChange={(event) => cityField = event.target.value} className="list-filter-textblock-price"/>
                    </div>
                </div>
                <button onClick={() => searchClick()} className="list-filter-search">Поиск</button>
            </div>
            <UsersCardsList filterProperties={qs.stringify(properties)}/>
        </div>
)}