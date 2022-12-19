import Categories from './categories'
import { useDispatch } from 'react-redux'
import { resetFastProviderRegistration } from '../../redux/userSlice'

export function ProvidersCategories(){
    const dispatch = useDispatch()
    dispatch( resetFastProviderRegistration() )
    return(
        <div className="categories-selectView">
            <Categories basepath="/providers"/>
        </div> 
)}

export function ProductsCategories(){
    const dispatch = useDispatch()
    dispatch( resetFastProviderRegistration() )
    return(
        <div className="categories-selectView">
            <Categories basepath="/products"/>
        </div> 
)}