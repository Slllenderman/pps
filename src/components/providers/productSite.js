import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

export function Product(){
    const product = useSelector((state) => state.user.product)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if(product == undefined) navigate('/')
    }, [])

    return(
        <div className='card-productsite'>
            <div className="card-container">
                <img src={product.photo}/>
                <div className="card-content-container">
                    <div className="card-title">{product.name}</div>
                    <div className="card-location">{product.price + " р"}</div>
                    <Link className="card-company" to={`/providerSite?providerName=${product.provider.name}&provider=${product.provider.pk}`}>
                        <img src={product.provider.photo}/>
                        {product.provider.name}
                    </Link>
                </div>
            </div>
            <div className='card-product-description'>{product.description}</div>
            <button onClick={() => navigate(-1)}>Вернуться назад</button>
        </div>
)}