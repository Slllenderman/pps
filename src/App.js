import { BrowserRouter, Route, Routes } from 'react-router-dom';


import { CustomersCategories, ProvidersCategories, ProductsCategories } from './components/categories'
import  { ProductsList, ProvidersList } from './components/List'
import { Authorization, Registration } from './components/auth'
import StartView from './components/startView'
import Navigation from './components/navigation'

function App(){
    return(
    <BrowserRouter basename='/'>
        <Navigation />
        <Routes>
            <Route path='/' element={ <StartView/> }/>
            <Route path='/providers/categories' element={ <ProvidersCategories/> } />
            <Route path='/customers/categories' element={ <CustomersCategories/> }/>
            <Route path='/products/categories' element={ <ProductsCategories/> }/>
            <Route path='/products' element={ <ProductsList/> }/>
            <Route path='/providers' element={ <ProvidersList/> }/>
            <Route path='/authorization' element={ <Authorization/> }/>
            <Route path='/registration' element={ <Registration/> }/>
        </Routes>
    </BrowserRouter>
)}

export default App