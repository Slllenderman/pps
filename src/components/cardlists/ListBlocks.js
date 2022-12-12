import { useEffect, useState } from 'react'
import { ProductCard, UserCard, ShCartCard } from './cards'
import axios from 'axios'

export function ProductsCardsList({ filterProperties, providerView }){
    if(filterProperties == undefined)
        filterProperties = ""
    const [list, setList] = useState()
    const getProductsApi = "http://127.0.0.1:8000/products/?" + filterProperties
    useEffect(() => {
        axios.get(getProductsApi)
        .then(response => setList( response.data ) )
        .catch(error => setList( [] ))
    }, [filterProperties])
    return (
        <div>
            { 
                list == undefined ?
                    <div className="list-single-title">Ошибка соединения с сервером</div> :
                list.length == 0 ?
                    <div className="list-single-title">Нет товаров по параметрам поиска</div> :
                list.map((item) => <ProductCard key={item.pk} product={item} isProviderView={providerView}/> )
            }
        </div>
)}

export function UsersCardsList({filterProperties}){
    if(filterProperties == undefined)
        filterProperties = ""
    const [list, setList] = useState()
    const getProductsApi = "http://127.0.0.1:8000/providers/?" + filterProperties
    useEffect(() => {
        axios.get(getProductsApi)
        .then(response => setList( response.data ) )
        .catch(error => setList( [] ))
    }, [filterProperties])

    return (
        <div>
            { 
                list == undefined ?
                    <div className="list-single-title">Ошибка соединения с сервером</div> :
                list.length == 0 ?
                    <div className="list-single-title">Нет поставщиков по параметрам поиска</div> :
                list.map((item) => <UserCard key={item.pk} provider={item}/> )
            }
        </div>
)}

export function ShCardsList(){
    return(
        <>
        <ShCartCard id="1" location="Мытищи" sum="300000" date="15.12.2022"/>
        <ShCartCard id="1" location="Мытищи" sum="300000" date="15.12.2022"/>
        <ShCartCard id="1" location="Мытищи" sum="300000" date="15.12.2022"/>
        </>
)}