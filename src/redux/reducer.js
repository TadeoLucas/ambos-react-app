import { SET_USERS,
  SET_PRODUCTS,
  SET_USER_DESIGNS,
  SET_ACTUAL_USER,
  SET_DESIGN,
  SET_ACTUAL_PRICE,
  SET_PRODUCTS_FOR_RESTART } from "./actions";

const initialState = {
    user_designs: [],
    products: [],
    users: [],
    restarts: [],
    Actualuser: undefined,
    design: undefined,
    actual_price: undefined
}

export default function reducer(state = initialState, { type, payload }) {
    switch(type) {
        case SET_ACTUAL_USER: return {
            ...state,
            Actualuser: payload
        }
        case SET_USERS: return {
            ...state,
            users: payload
        }
        case SET_PRODUCTS: return {
            ...state,
            products: payload
        }
        case SET_USER_DESIGNS: return {
            ...state,
            user_designs: payload
        }
        case SET_DESIGN: return {
            ...state,
            design: payload
        }
        case SET_PRODUCTS_FOR_RESTART: return {
            ...state,
            restarts: payload
        }
        case SET_ACTUAL_PRICE: return {
            ...state,
            actual_price: payload
        }
        default: return state
    }
}