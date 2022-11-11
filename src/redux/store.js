import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';


export const store = configureStore({
  reducer: reducer
});


//------- react 18 ------