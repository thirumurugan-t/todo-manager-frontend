// import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "./slices/counterslice";

// export const store = configureStore({
//     reducer:{
//         counter:counterReducer,
//     }

// })

import { configureStore } from "@reduxjs/toolkit";
import todosReducer from './slices/counterslice'

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

export default store;
