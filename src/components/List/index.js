import { ProductsCardsList, UsersCardsList } from './ListBlocks'
import { useSearchParams } from 'react-router-dom'

function TransformProdTitle(paramTitle){
    switch(paramTitle){
        case "clothes":
            return "одежда, обувь и аксессуары"
        case "meals":
            return "продукты питания и напитки"
        case "repaires":
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

export function ProductsList(){
    const [params, setParams] = useSearchParams()
    const title = TransformProdTitle(params.get("category"))
    return (
        <div className="list">
            <div className="list-title">{"Список товаров по категории: " + title}</div>
            <div className="list-filter">
                <div>
                    <div className="list-filter-title">Найти</div>
                    <input type="text" className="list-filter-textblock-find"/>
                </div>
                <div>
                    <div className="list-filter-price">
                        <span className="list-filter-price-title">От</span>
                        <input type="text" className="list-filter-textblock-price"/>
                    </div>
                    <div className="list-filter-price">
                        <span className="list-filter-price-title">До</span>
                        <input type="text" className="list-filter-textblock-price"/>
                    </div>
                </div>
            </div>
            <ProductsCardsList />
        </div>
)}

export function ProvidersList(){
    const [params, setParams] = useSearchParams()
    const title = TransformProdTitle(params.get("category"))
    return (
        <div className="list">
            <div className="list-title">{"Список товаров по категории: " + title}</div>
            <div className="list-filter">
                <div>
                    <div className="list-filter-title">Найти</div>
                    <input type="text" className="list-filter-textblock-find"/>
                </div>
                <div>
                    <div className="list-filter-price">
                        <span className="list-filter-price-title">Город</span>
                        <input type="text" className="list-filter-textblock-price"/>
                    </div>
                </div>
            </div>
            <UsersCardsList />
        </div>
)}