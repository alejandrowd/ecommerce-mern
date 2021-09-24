import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productsReducer,newProductReducer,productReducer, productDetailsReducer, newReviewReducer,productReviewsReducer,reviewReducer} from './reducers/productReducers'
import {authReducer,userReducer,forgotPasswordReducer,allUsersReducer,userDetailsReducer} from './reducers/userReducers'
import {cartReducer} from './reducers/cartReducers'
import { newOrderReducer,myOrdersReducer, orderDetailsReducer, allOrdersReducer, orderReducer } from './reducers/orderReducer'


const Reducer = combineReducers({
    products : productsReducer,
    productDetails:productDetailsReducer,
    newProduct:newProductReducer,
    product:productReducer,
    productReviews:productReviewsReducer,
    review:reviewReducer,
    auth:authReducer,
    user:userReducer,
    forgotPassword:forgotPasswordReducer,
    allUsers:allUsersReducer,
    userDetails:userDetailsReducer,
    cart:cartReducer,
    newOrder:newOrderReducer,
    myOrders:myOrdersReducer,
    allOrders:allOrdersReducer,
    orderDetails:orderDetailsReducer,
    order:orderReducer,
    newReview:newReviewReducer,

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