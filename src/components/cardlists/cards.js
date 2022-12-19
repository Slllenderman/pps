import mocklogo from '../../static/logo.jpg'
import shCartImg from '../../static/shCart.svg'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOrder } from '../../redux/shCartSlice'
import { useCookies } from 'react-cookie'

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
        if(!auth) navigate('/')
    }, [orders])

    return(
       <div className="card-container">
            <img src={product.photo}/>
            <div className="card-content-container">
                <div className="card-title">{product.name}</div>
                <div className="card-location">{product.price + " р"}</div>
                { !providerView ?
                <>
                <Link className="card-company" to="/somecompany">
                    <img src={product.provider.photo}/>
                    {product.provider.name}
                </Link>
                <div className="card-countProd">
                    <input className='card-count-input' type='number' defaultValue={order.quantity} onChange={(event) => input(event)}/>
                </div>
                </>
                :
                <div className="card-countProd">
                    <button className="card-countButton minus">
                        <svg className='card-bt-minus' viewBox="0 0 15 15"><path d="M7.5,0C3.364,0,0,3.364,0,7.5S3.364,15,7.5,15S15,11.636,15,7.5S11.636,0,7.5,0z M7.5,14C3.916,14,1,11.084,1,7.5  S3.916,1,7.5,1S14,3.916,14,7.5S11.084,14,7.5,14z"/><rect height="1" width="8" x="3.5" y="7"/></svg>
                        <span className="card-bt-minus-text">Удалить товар</span>
                    </button>
                </div>
                }
            </div>
        </div>
)}

export function ProductCard({order}){
    return(
       <div className="card-container">
            <img src={order.product.photo}/>
            <div className="card-content-container">
                <div className="card-title">{order.product.name}</div>
                <div className="card-location">{order.product.price + " р"}</div>
                <div className='card-title-order'>{`Количество: ${order.quantity}`}</div>
                <div className='card-title-order'>{`Сумма: ${order.quantity * order.product.price}`}</div>
                <Link className="card-company" to="/somecompany">
                    <img src={order.product.provider.photo}/>
                    {order.product.provider.name}
                </Link>
            </div>
        </div>
)}

export function ShCartCard({cart}){

    return(
        <Link to={`/shoppingCartView?uuid=${cart.pk}`} className="card-userlink">
            <div className='card-container'>
                <img src={shCartImg}/>
                <div className="card-content-container">
                    <div className='card-title'>Корзина #</div>
                    <div className="card-uuid">{cart.pk}</div>
                    {
                        cart.state == 'P'?
                            <div className="card-processing">Заказ обрабатывается</div> :
                        cart.state == 'A'?
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
