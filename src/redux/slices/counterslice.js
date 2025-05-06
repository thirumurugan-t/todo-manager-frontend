// import { createSlice } from "@reduxjs/toolkit";

// const CounterSlice = createSlice({
//   name: "counter",
//   initialState: { count: 0 },
//   reducers: {
//     increment: (state) => {
//       state.count += 1;  // Mutating the state directly
//     },
//     decrement: (state) => {
//       state.count -= 1;  // Mutating the state directly
//     },
//     reset: (state) => {
//       state.count = 0;  // Mutating the state directly
//     },
//   },
// });

// export const { increment, decrement, reset } = CounterSlice.actions;
// export default CounterSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      const { todo } = action.payload;
      const newTodo = { ...todo, _id: state.length ? state[state.length - 1]._id + 1 : 1 };
      localStorage.setItem("TODOS", JSON.stringify([...state, newTodo]));
      state.push(newTodo);
    },
    editTodo: (state, action) => {
      const { key, todo } = action.payload;
      const todoIndex = state.find((item) => item._id === key);
      if (todoIndex >= 0) {
        state[todoIndex] = { ...state[todoIndex], ...todo };
        localStorage.setItem("TODOS", JSON.stringify(state));
      }
    },
    deleteTodo: (state, action) => {
      const { key } = action.payload;
      const filteredItems = state.filter((item) => item._id !== key);
      localStorage.setItem("TODOS", JSON.stringify(filteredItems));
      return filteredItems;
    },
    toggleCheckbox: (state, action) => {
      const { key } = action.payload;
      const changeCheckbox = state.map((item) =>
        item._id === key ? { ...item, checked: !item.checked } : item
      );
      localStorage.setItem("TODOS", JSON.stringify(changeCheckbox));
      return changeCheckbox;
    },
    loadTodos: (state, action) => {
      return action.payload;
    },
  },
});

export const { addTodo, editTodo, deleteTodo, toggleCheckbox, loadTodos } = todosSlice.actions;
export default todosSlice.reducer;

