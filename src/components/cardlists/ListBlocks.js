import { useEffect, useState } from 'react'
import { OrderProductCard, UserCard, ShCartCard, ProductCard } from './cards'
import axios from 'axios'
import { useSelector } from 'react-redux'

export function ProductsCardsList({ filterProperties, providerView }){
    if(filterProperties == undefined)
        filterProperties = ""
    const [lastFilterproperties, setLast] = useState('')
    const [list, setList] = useState()
    if(lastFilterproperties != filterProperties)
        setLast(filterProperties)

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/products/?${filterProperties}`)
        .then(response => setList( response.data ) )
        .catch(error => setList( [] ))
    }, [lastFilterproperties])

    return (
        <div>
            { 
                list == undefined ?
                    <div className="list-single-title">Ошибка соединения с сервером</div> :
                list.length == 0 ?
                    <div className="list-single-title">Нет товаров по параметрам поиска</div> :
                    list.map((item) => <OrderProductCard key={item.pk} product={item} providerView={providerView}/> )
            }
        </div>
)}

export function CartProductsCardsList({emptyErr}){
    const orders = useSelector((state) => state.cart.orders)
    let products = []
    for(const[key, value] of Object.entries(orders)) products.push(value.product)
    
    return (
        <div>
            { 
              products.length == 0 ?
                    !emptyErr ?
                        <div className="list-single-title">Нет товаров в корзине</div> :
                        <div className="list-single-err">Нет товаров для оформления заказа</div>
                    :
                    products.map((item) => <OrderProductCard key={item.pk} product={item}/> )
            }
        </div>
)}

export function UsersCardsList({filterProperties}){
    if(filterProperties == undefined)
        filterProperties = ""
    const [lastFilterproperties, setLast] = useState('')
    if(lastFilterproperties != filterProperties)
        setLast(filterProperties)
    const [list, setList] = useState()
    const getProvidersApi = "http://127.0.0.1:8000/providers/?" + filterProperties
    useEffect(() => {
        axios.get(getProvidersApi)
        .then(response => setList( response.data ) )
        .catch(error => setList( [] ))
    }, [lastFilterproperties])

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

export function ShCartCardsList({filterProperties}){
    if(filterProperties == undefined)
        filterProperties = ""
    const [lastFilterproperties, setLast] = useState('')
    if(lastFilterproperties != filterProperties)
        setLast(filterProperties)
    const token = useSelector((state) => state.user.token)
    const [list, setList] = useState()
    const getCartsApi = "/shoppingcarts?" + filterProperties

    useEffect(() => {
        if(token != '')
            axios.get(getCartsApi, { "headers" : { "Authorization" : "token " + token }})
            .then(response => { setList( response.data ) })
            .catch(error => {
                console.log(error)
                setList( [] )
            })
    }, [lastFilterproperties])

    return (
        <div>
            { 
                list == undefined ?
                    <div className="list-single-title">Ошибка соединения с сервером</div> :
                list.length == 0 ?
                    <div className="list-single-title">Нет оптовых заказов по параметрам поиска</div> :
                list.map((item) => <ShCartCard key={item.pk} cart={item}/> )
            }
        </div>
)}

export function ShCartViewList({token, uuid}){
    const [orders, setOrders] = useState()
    const [sum, setSum] = useState(0)
    useEffect(() => {
        if(token != '')
            axios.get(`/orders?shCart=${uuid}`,
            { "headers" : { "Authorization" : "token " + token }})
            .then((response) => {
                let sum = 0
                for(let i = 0; i < response.data.length; i++)
                    sum += response.data[i].quantity * response.data[i].product.price
                setSum(sum)
                setOrders(response.data) 
            })
            .catch((err) => console.log(err))
    }, [])

    return(
        <div>
            <div className='shCart-view-label'>{`Общая сумма заказа: ${sum} рублей`}</div>
            { 
                orders == undefined ?
                    <div className="list-single-title">Ошибка соединения с сервером</div> :
                orders.length == 0 ?
                    <div className="list-single-title">Нет оптовых заказов по параметрам поиска</div> :
                orders.map((item) => <ProductCard key={item.pk} order={item}/>)
            }
        </div>
)}