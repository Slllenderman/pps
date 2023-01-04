import mock from '../../static/box.png'
import shCartImg from '../../static/shCart.svg'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOrder, setReqReload } from '../../redux/shCartSlice'
import { useCookies } from 'react-cookie'
import { setProduct } from '../../redux/userSlice'
import axios from 'axios'

export function UserCard({provider}){
    const [params, setParams] = useSearchParams()
    const category = params.get('category')
    let link = ''
    if(category != null)
        link = `/providerSite?providerName=${provider.name}&provider=${provider.pk}&category=${category}`
    else
        link = `/providerSite?providerName=${provider.name}&provider=${provider.pk}`
    return(
        <Link to={link} className="card-userlink">
            <div className='card-container'>
                <img src={provider.photo}/>
                <div className="card-content-container">
                    <div className="card-title">{provider.name}</div>
                    <div className="card-location">{provider.location}</div>
                    <div className="card-description">{provider.description}</div>
                </div>
            </div>
        </Link>
)}


export function OrderProductCard({product, providerView}){
    const order = useSelector((state) => state.cart.orders[product.pk] ? state.cart.orders[product.pk] : {quantity : 0})
    const orders = useSelector((state) => state.cart.orders)
    const auth = useSelector((state) => state.user.isAuthorized)
    const token = useSelector((state) => state.user.token)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [cookie, setCookie] = useCookies()
    const [lastQuantity, setLastQuantity] = useState(order.quantity)

    const input = (e) => {
        if(!auth){
            alert('Для добавления продукта необходима регистрация')
            navigate('/registration')
        } else {
            if(lastQuantity != e.target.value){ 
                const order = {
                    quantity: Math.abs(e.target.value),
                    product : product
                }
                dispatch( setOrder(order) )
                setLastQuantity(Math.abs(e.target.value))
            }
        }
    }

    useEffect(() => {
        setCookie('orders', orders, {path:'/'})
    }, [orders])

    const click = () => {
        dispatch(setProduct(product))
        navigate('/productSite')
    }

    const minus = () => {
        axios.delete(`/products/?product=${product.pk}`,  { "headers" : { "Authorization" : "token " + token }})
        .then(res => dispatch(setReqReload(true))).catch(err => console.log(err))
    }

    return(
       <div className="card-container">
            <img src={product.photo ? product.photo : mock} onClick={() => click()}/>
            <div className="card-content-container">
                <div className="card-title">{product.name}</div>
                <div className="card-location">{product.price + " р"}</div>
                { !providerView ?
                <>
                <Link className="card-company" to={`providerSite?providerName=${product.provider.name}&provider=${product.provider.pk}`}>
                    <img src={product.provider.photo ? product.provider.photo : mock}/>
                    {product.provider.name}
                </Link>
                <div className="card-countProd">
                    <input className='card-count-input' type='number' defaultValue={order.quantity} onChange={(event) => input(event)}/>
                </div>
                </>
                :
                <div className="card-countProd">
                    <button className="card-countButton minus" onClick={() => minus()}>
                        <svg className='card-bt-minus' viewBox="0 0 15 15"><path d="M7.5,0C3.364,0,0,3.364,0,7.5S3.364,15,7.5,15S15,11.636,15,7.5S11.636,0,7.5,0z M7.5,14C3.916,14,1,11.084,1,7.5  S3.916,1,7.5,1S14,3.916,14,7.5S11.084,14,7.5,14z"/><rect height="1" width="8" x="3.5" y="7"/></svg>
                        <span className="card-bt-minus-text">Удалить товар</span>
                    </button>
                </div>
                }
            </div>
        </div>
)}

export function ProductCard({order, provider}){
    const [processing, setProcessing] = useState( order.state == 'P')
    const [rejected, setRejected] = useState( order.state == 'R' )
    const token = useSelector((state) => state.user.token)

    const confirm = () => {
        axios.put(`/orders/?order=${order.pk}&status=A&provider=${provider}`, {}, { "headers" : { "Authorization" : "token " + token }})
        .then(res => {
            setProcessing(false)
            setRejected(false)
            console.log(res)
        })
        .catch(err => console.log(err))
    }

    const reject = () => {
        axios.put(`/orders/?order=${order.pk}&status=R&provider=${provider}`, {}, { "headers" : { "Authorization" : "token " + token }})
        .then(res => {
            setProcessing(false)
            setRejected(true)
            console.log(res)
        })
        .catch(err => console.log(err))
    }

    return(
       <div className="card-container">
            <img src={order.product.photo}/>
            <div className="card-content-container">
                <div className="card-title">{order.product.name}</div>
                <div className='card-title-order'>{`Количество: ${order.quantity}`}</div>
                <div className='card-title-order'>{`Сумма: ${order.quantity * order.product.price}`}</div>
                {
                order.state == 'P' && provider == 'undefined'?
                    <div className="card-processing">Заказ обрабатывается</div> :
                order.state == 'A' && provider == 'undefined'?
                    <div className="card-confirmed">Заказ принят</div> :
                order.state == 'R' && provider == 'undefined'?
                    <div className="card-rejected">Заказ отклонён</div> :
                null
                }
                {
                provider == 'undefined' ? 
                <Link className="card-company" to={`/providerSite?provider=${order.product.provider.pk}&providerName=${order.product.provider.name}`}>
                    <img src={order.product.provider.photo}/>
                    {order.product.provider.name}
                </Link>
                :
                processing ?
                <><div className="card-orderProd">
                    <button className="card-orderBt plus" onClick={() => confirm()}>
                        <svg className="card-bt-plus" viewBox="0 0 15 15"><path d="M7.5,0C3.364,0,0,3.364,0,7.5S3.364,15,7.5,15S15,11.636,15,7.5S11.636,0,7.5,0z M7.5,14C3.916,14,1,11.084,1,7.5  S3.916,1,7.5,1S14,3.916,14,7.5S11.084,14,7.5,14z"/><polygon points="8,3.5 7,3.5 7,7 3.5,7 3.5,8 7,8 7,11.5 8,11.5 8,8 11.5,8 11.5,7 8,7 "/></svg>
                        <span className="card-bt-plus-text">Принять заказ</span>
                    </button>
                </div>
                <div className="card-orderProd">
                    <button className="card-orderBt minus" onClick={() => reject()}>
                        <svg className='card-bt-minus' viewBox="0 0 15 15"><path d="M7.5,0C3.364,0,0,3.364,0,7.5S3.364,15,7.5,15S15,11.636,15,7.5S11.636,0,7.5,0z M7.5,14C3.916,14,1,11.084,1,7.5  S3.916,1,7.5,1S14,3.916,14,7.5S11.084,14,7.5,14z"/><rect height="1" width="8" x="3.5" y="7"/></svg>
                        <span className="card-bt-minus-text">Отклонить заказ</span>
                    </button>
                </div></> :
                rejected ?
                    <div className='card-order-rejected'>
                        <div className='card-title-order'>Заказ отклонён</div>
                    </div>
                :
                    <div className='card-order-confirmed'>
                        <div className='card-title-order'>Заказ принят</div>
                    </div>
                }
                
            </div>
        </div>
)}

export function ShCartCard({cart, provider}){
    return(
        <Link to={`/shoppingCartView?uuid=${cart.pk}&provider=${provider}`} className="card-userlink">
            <div className='card-container'>
                <img src={shCartImg}/>
                <div className="card-content-container">
                    <div className='card-title'>Корзина #</div>
                    <div className="card-uuid">{cart.pk}</div>
                    {
                        cart.state == 'A'?
                            <div className="card-processing">Заказ обрабатывается</div> :
                        cart.state == 'B'?
                            <div className="card-processing">Заказ ожидает оплаты</div> :
                        cart.state == 'C'?
                            <div className="card-confirmed">Заказ принят</div> :
                            <div className="card-rejected">Заказ отклонён</div>
                    }
                    <div className="card-description">
                        <p>{`Локация: ${cart.address}`}</p>
                        <p>{`Дата: ${cart.date}`}</p>
                    </div>
                </div>
            </div>
        </Link>
)}
