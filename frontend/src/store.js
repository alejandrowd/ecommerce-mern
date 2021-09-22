import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productsReducer,productDetailsReducer} from './reducers/productReducers'
import {authReducer,userReducer,forgotPasswordReducer} from './reducers/userReducers'
import {cartReducer} from './reducers/cartReducers'


const Reducer = combineReducers({
    products : productsReducer,
    productDetails:productDetailsReducer,
    auth:authReducer,
    user:userReducer,
    forgotPassword:forgotPasswordReducer,
    cart:cartReducer

})

let initialState={
    cart:{
        cartItems : localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : {}
    }
}

const middleware = [thunk]

const store = createStore(Reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))



export default store