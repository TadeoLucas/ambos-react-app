import axios from 'axios';
import { signIn } from "../firebase";
import { getAuth, signOut } from "firebase/auth";


export const SET_USERS = "SET_USERS";
export const SET_ACTUAL_USER = "SET_ACTUAL_USER";
export const SET_USER_DESIGNS = "SET_USER_DESIGNS";
export const SET_PRODUCTS = "SET_PRODUCTS";
export const SET_DESIGN = "SET_DESIGN";
export const SET_ACTUAL_PRICE = "SET_ACTUAL_PRICE";
export const SET_PRODUCTS_FOR_RESTART = "SET_PRODUCTS_FOR_RESTART";


export function setActualUser() {
  return async (dispatch) => {
      try{
        const result = await signIn();
        const userInfo = result.user.reloadUserInfo;
// console.log('info q devuelve google', userInfo);
        const response = await axios.post("/api/user", userInfo);
// console.log('response de railway', response);
        localStorage.setItem('id', userInfo.localId);
          return dispatch(getUserStatus());

      }catch(error){
          console.log('Error_Actions_setActualUser', error);
      }
  }
};

export function getUsers() {
  return async (dispatch) => {
      try{
        const response = await axios.get("/api/user");
          return dispatch({ type: SET_USERS, payload: response.data });
      }catch(error){
          console.log('Error_dispath getUsers', error);
          return alert(error.message)
      }
  }
};

export function getUserStatus() {
return async (dispatch) => {
  try{
    const id = localStorage.getItem('id');
    const response = await axios.get(`/api/user/unique/${id}`);
    
    return dispatch({ type: SET_ACTUAL_USER, payload: response.data });

  }catch(error){
    console.log('Error_dispath getUserStatus', error);
    return alert(error.message)
  }
}
};

export function clearUser() {
  return async (dispatch) => {
    try{
      await signOut(getAuth());
      localStorage.clear();
        return dispatch({ type: SET_ACTUAL_USER, payload: undefined })

    }catch(error) {
      console.log('Error_Actions_clearUser', error);
    }
    
  }
};

export function getProducts() {
  
  return async (dispatch) => {
    try{
        const response = await axios.get("/api/products");
          return dispatch({ type: SET_PRODUCTS, payload: response.data });
      }catch(error){
          console.log('Error_dispatch getProducts', error);
          return alert(error.message);
      }
  }
};

export function getActualPrice() {
  return async (dispatch) => {
    try{
      const prices = await axios.get('/api/price/');

      return dispatch({ type: SET_ACTUAL_PRICE, payload: prices.data[0] });
    }catch(error) {
      console.log('error actions getActualPrice', error)
    }
  }
}


export function getDesigns(clientId) {
  return async (dispatch) => {
    try{
      const response = await axios.get(`/api/design/${clientId}`);
      return dispatch({ type: SET_USER_DESIGNS, payload: response.data });
    }catch(error){
      console.log('Error_dispatch getDesigns', error);
      return alert(error.message);
    }
  }
};

export function getProductsAwaitingPay() {
  return async (dispatch) => {
    try{
      const response = await axios.get('/api/saleshistory/restart');
    
      return dispatch({ type: SET_PRODUCTS_FOR_RESTART, payload: response.data });
      
    }catch(error) {
      console.log('error actions getAwaitingPay', error)
    }
  }
}

// export function getUserAndDesigns(localId) {
//   return async (dispatch) => {
//     try{
//       const response = await axios.get(`/api/user/withDesign/${localId}`);
//       return dispatch({ type: SET_USER_DESIGNS, payload: response });
      
//     }catch(error){
//       console.log('Error_dispatch getUserAndDesigns', error);
//       return alert(error.message);
//     }
//   }
// }
