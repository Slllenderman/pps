import Categories from '../categories/categories'
import Greeting from './greeting'
import UXSteps from './steps'

function StartPage(){
    return(
        <div>
            <div className="header">
                <Greeting />
            </div>
            <div className="body">
                <UXSteps />
                <div className="categories-startView">
                    <Categories basepath="/providers"/>
                </div>
            </div>
            <div className="bottom-rect"/>
        </div>
)}

export default StartPage