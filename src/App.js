import { BrowserRouter, Route, Routes } from 'react-router-dom';


import { CustomersCategories, ProvidersCategories, ProductsCategories } from './components/categories'
import  { ProductsList, ProvidersList } from './components/List'
import { Authorization, Registration } from './components/auth'
import ShoppingCart from './components/shCart';
import StartView from './components/startView'
import Navigation from './components/navigation'
import Profile from './components/profile';
import ProviderRegistration from './components/provReg';

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
            <Route path='/shoppingCart' element={ <ShoppingCart/> }/>
            <Route path='/profile' element={ <Profile/> }/>
            <Route path='/providerReg' element={ <ProviderRegistration/> }/>
        </Routes>
    </BrowserRouter>
)}

export default App