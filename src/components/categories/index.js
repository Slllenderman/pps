import Categories from './categories'

export function CustomersCategories(){
    return(
        <div className="categories-selectView">
            <Categories basepath="/customers"/>
        </div> 
)}

export function ProvidersCategories(){
    return(
        <div className="categories-selectView">
            <Categories basepath="/providers"/>
        </div> 
)}

export function ProductsCategories(){
    return(
        <div className="categories-selectView">
            <Categories basepath="/products"/>
        </div> 
)}