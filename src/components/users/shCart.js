import { CartProductsCardsList, ShCartViewList } from '../cardlists/listblocks'
import { setDate, setLocation, logoutShCart, setReqReload } from '../../redux/shCartSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import qs from 'qs'
import axios from 'axios'

export function ShoppingCart(){
    const cart = useSelector((state) => state.cart)
    const auth = useSelector((state) => state.user.isAuthorized)
    const token = useSelector((state) => state.user.token)
    const dispatch = useDispatch()
    const navigation = useNavigate()
    const [cookie, setCookie, removeCookie] = useCookies(['shCartDate', 'shCartLocation'])
    const [dateErr, setDateErr] = useState(false)
    const [locationErr, setLocationErr] = useState(false)
    const [emptyOrdersErr, setEmptyOrdersErr] = useState(false)
    
    useEffect(() => {
        if(!auth) navigation("/")
    }, [])
        
    const inputLocation = (e) => {
        setCookie('shCartLocation', e.target.value, {path:'/'})
        dispatch(setLocation(e.target.value))
    }

    const inputDate = (e) => {
        setCookie('shCartDate', e.target.value, {path:'/'})
        dispatch(setDate(e.target.value))
    }

    const confirmCart = () => {
        if(Object.keys(cart.orders).length != 0){
            axios.post(`/shoppingcarts/?username=${cookie.auth.login}`, {
                address : cart.location,
                date : cart.date
            }, {
                headers : {
                    Authorization : `Token ${token}`
                }
            })
            .then(response => {
                const cartUUID = response.data.pk
                Object.keys(cart.orders).forEach(key => {
                    axios.post(`/orders/?shCart=${cartUUID}`,{
                        quantity : cart.orders[key].quantity,
                        product : cart.orders[key].product.pk,
                        shCart : cartUUID    
                    }, {
                        headers : {
                            Authorization : `Token ${token}`
                        }
                    })
                    .then(() => {
                        dispatch( logoutShCart() )
                        removeCookie('shCartDate', {path:'/'})
                        removeCookie('shCartLocation', {path:'/'})
                        removeCookie('orders', {path:'/'})
                        navigation(`/ShoppingCartView?uuid=${cartUUID}&provider=undefined`)  
                    })
                    .catch(err => console.log(err))
                })
            }).catch(err => {
                const data = err.response.data
                if(data.date) setDateErr(true)
                else setDateErr(false)
                if(data.address) setLocationErr(true)
                else setLocationErr(false)
                console.log(err)
            })
        } else setEmptyOrdersErr(true)
    }

    return(
        <div className="shCart-container">
            <div className="shCart-title">
                <svg className="header-navigation-rightpart-image" viewBox="0 0 459.529 459.529"><g><g><path d="M17,55.231h48.733l69.417,251.033c1.983,7.367,8.783,12.467,16.433,12.467h213.35c6.8,0,12.75-3.967,15.583-10.2l77.633-178.5c2.267-5.383,1.7-11.333-1.417-16.15c-3.117-4.817-8.5-7.65-14.167-7.65H206.833c-9.35,0-17,7.65-17,17s7.65,17,17,17H416.5l-62.9,144.5H164.333L94.917,33.698c-1.983-7.367-8.783-12.467-16.433-12.467H17c-9.35,0-17,7.65-17,17S7.65,55.231,17,55.231z"/><path d="M135.433,438.298c21.25,0,38.533-17.283,38.533-38.533s-17.283-38.533-38.533-38.533S96.9,378.514,96.9,399.764S114.183,438.298,135.433,438.298z"/><path d="M376.267,438.298c0.85,0,1.983,0,2.833,0c10.2-0.85,19.55-5.383,26.35-13.317c6.8-7.65,9.917-17.567,9.35-28.05c-1.417-20.967-19.833-37.117-41.083-35.7c-21.25,1.417-37.117,20.117-35.7,41.083C339.433,422.431,356.15,438.298,376.267,438.298z"/></g></g></svg>
                Заполняемая корзина
            </div>
            <div className="shCart-label">Дата доставки</div>
            { dateErr ? <div className='shCart-err'>Неправильный формат даты. Дата обязана иметь формат 'YYYY-MM-DD'</div> : null }
            <input className="shCart-textBlock" type="text" defaultValue={cart.date}
            onChange={(e) => inputDate(e)}/>
            <div className="shCart-label">Место доставки</div>
            { locationErr ? <div className='shCart-err'>Поле локации обязано быть заполненым</div> : null }
            <div className="shCart-grid">
                <input className="shCart-textBlock" type="text" defaultValue={cart.location}
                onChange={(e) => inputLocation(e)}/>
                <button className="shCart-confirm" onClick={() => confirmCart()}><span>Принять</span></button>
            </div>
            <div className='shCart-title'>{`Общая сумма: ${cart.sum} `}</div>
            <CartProductsCardsList emptyErr={emptyOrdersErr}/>
        </div>
)}

export function ShoppingCartView(){
    const user = useSelector((state) => state.user)
    const req = useSelector((state) => state.cart.req)
    const [cookie, setCookie] = useCookies(["auth"])
    const [params, setParams] = useSearchParams()
    const dispatch = useDispatch()
    const navigation = useNavigate()  
    const [cart, setCart] = useState()
    let parametrs

    useEffect(() => {
        if(!user.isAuthorized) navigation("/")
        if(req) dispatch( setReqReload(false) )
            if(params.get('provider') != 'undefined'){
                parametrs = {
                    provider : params.get('provider'),
                    id : params.get('uuid') 
                }
            }
            else{
                parametrs = {
                    username : cookie.auth.login,
                    id : params.get('uuid') 
                }
            }
            if(user.token != '')
                axios.get('/shoppingcarts?' + qs.stringify(parametrs),
                { "headers" : { "Authorization" : "token " + user.token }})
                .then((response) => setCart(response.data[0]) )
                .catch((err) => console.log(err))
    }, [req])

    return(
        cart ? 
        <div className="shCart-container">
            <div className="shCart-title">
                <svg className="header-navigation-rightpart-image" viewBox="0 0 459.529 459.529"><g><g><path d="M17,55.231h48.733l69.417,251.033c1.983,7.367,8.783,12.467,16.433,12.467h213.35c6.8,0,12.75-3.967,15.583-10.2l77.633-178.5c2.267-5.383,1.7-11.333-1.417-16.15c-3.117-4.817-8.5-7.65-14.167-7.65H206.833c-9.35,0-17,7.65-17,17s7.65,17,17,17H416.5l-62.9,144.5H164.333L94.917,33.698c-1.983-7.367-8.783-12.467-16.433-12.467H17c-9.35,0-17,7.65-17,17S7.65,55.231,17,55.231z"/><path d="M135.433,438.298c21.25,0,38.533-17.283,38.533-38.533s-17.283-38.533-38.533-38.533S96.9,378.514,96.9,399.764S114.183,438.298,135.433,438.298z"/><path d="M376.267,438.298c0.85,0,1.983,0,2.833,0c10.2-0.85,19.55-5.383,26.35-13.317c6.8-7.65,9.917-17.567,9.35-28.05c-1.417-20.967-19.833-37.117-41.083-35.7c-21.25,1.417-37.117,20.117-35.7,41.083C339.433,422.431,356.15,438.298,376.267,438.298z"/></g></g></svg>
                {"Корзина " + cart.pk}
            </div>
            <div className="shCart-view-label">{`Локация доставки: ${cart.address}`}</div>
            <div className="shCart-view-label">{`Дата доставки: ${cart.date}`}</div>
            { cart.confirmedTime == null ? 
              <div className="shCart-view-label">{`Дата создания: ${cart.creatingTime}`}</div> :
              <div className="shCart-view-label">{`Дата оплаты: ${cart.confirmedTime}`}</div> }
            { cart.state == 'A'? <div className="shCart-view-label">Заказ обрабатывается</div> :
              cart.state == 'B'? <div className="shCart-view-label">Заказ ожидает оплаты</div> :
              cart.state == 'C'? <div className="shCart-view-label">Заказ принят</div> :
              cart.state == 'D'? <div className="shCart-view-label">Заказ отклонён</div> : null }
            <ShCartViewList token={user.token} uuid={params.get('uuid')} cart={cart}/>
        </div> : null
)}
