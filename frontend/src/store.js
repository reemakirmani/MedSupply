import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { productDetailsReducer, productListReducer, productSaveReducer } from './reducers/productReducers';
import {userRegisterReducer, userSigninReducer} from './reducers/userReducers';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie'; 
import { cartReducer } from './reducers/cartReducers';

const cartItems = Cookie.getJSON('cartItems') || [];
const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = {cart: {cartItems}, userSignin: { userInfo}};

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    productSave: productSaveReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore (reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;