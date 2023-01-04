import { useEffect, useState } from 'react'
import { OrderProductCard, UserCard, ShCartCard, ProductCard } from './cards'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setReqReload } from '../../redux/shCartSlice'
import { useNavigate, useSearchParams } from 'react-router-dom'

export function ProductsCardsList({ filterProperties, providerView }){

    const dispatch = useDispatch()
    const req = useSelector((state) => state.cart.req)
    useEffect(() => {
        if(req)
            dispatch( setReqReload(false) )
    }, [req])

    if(filterProperties == undefined)
        filterProperties = ""
    const [lastFilterproperties, setLast] = useState('')
    const [list, setList] = useState()
    if(lastFilterproperties != filterProperties)
        setLast(filterProperties)

    useEffect(() => {
        axios.get(`/products/?${filterProperties}`)
        .then(response => setList( response.data ) )
        .catch(error => setList( [] ))
    }, [lastFilterproperties, req])

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
    const getProvidersApi = "/providers/?" + filterProperties
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

export function ShCartViewList({token, uuid, cart}){
    const [orders, setOrders] = useState()
    const [sum, setSum] = useState(0)
    const [params, setParams] = useSearchParams()
    const provider = params.get('provider')
    const dispatch = useDispatch()

    useEffect(() => {
        if(token != ''){
            let url = ''
            if(provider != 'undefined')
            {
                url = `/orders?shCart=${uuid}&provider=${provider}`
            }
            else
            { 
                url = `/orders?shCart=${uuid}`
            }

            axios.get(url, { "headers" : { "Authorization" : "token " + token }})
            .then((response) => {
                let sum = 0
                for(let i = 0; i < response.data.length; i++)
                    sum += response.data[i].quantity * response.data[i].product.price
                setSum(sum)
                setOrders(response.data) 
            })
            .catch((err) => console.log(err))
        }
    }, [])

    const payClick = () => {
        axios.put(`/shoppingcarts/?shCart=${uuid}`, {}, { "headers" : { "Authorization" : "token " + token }})
        .then(res => dispatch(setReqReload(true)))
        .catch(err => console.log(err))
    }

    return(
        <div>
            <div className='shCart-grid'>
                <div className='shCart-view-label'>{`Сумма заказа: ${sum} рублей`}</div>
                { cart.state == 'B' ? <button className="shCart-pay" onClick={() => payClick()}><span>Оплатить</span></button> : null}
            </div>
            { 
                orders == undefined ?
                    <div className="list-single-title">Ошибка соединения с сервером</div> :
                orders.length == 0 ?
                    <div className="list-single-title">Нет оптовых заказов по параметрам поиска</div> :
                orders.map((item) => <ProductCard key={item.pk} order={item} provider={provider}/>)
            }
        </div>
)}

export function ProviderOrdersList({filterProperties}){
    const [carts, setCarts] = useState([])
    const token = useSelector((state) => state.user.token)
    const auth = useSelector((state) => state.user.isAuthorized)
    const [params, setParams] = useSearchParams()
    const navigate = useNavigate()
    
    useEffect(() => {
        if(!auth) navigate('/')
        else{
            axios.get(`/shoppingcarts/?${filterProperties}`, { "headers" : { "Authorization" : "token " + token }})
            .then(res => setCarts(res.data))
            .catch(err => setCarts([]))
        }
    }, [filterProperties])


    return(
        <div className='list'>
            { 
                carts == undefined ?
                    <div className="list-single-title">Ошибка соединения с сервером</div> :
                carts.length == 0 ?
                    <div className="list-single-title">Нет оптовых заказов</div> :              
                    carts.map((item) => <ShCartCard key={item.pk} cart={item} provider={params.get('provider')}/>)
            }            
        </div>
)}