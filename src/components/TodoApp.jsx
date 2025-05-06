import { useState, createContext, useReducer, useEffect } from 'react';
import '../App.css';
import Header from './Header';
import Navigation from '../components/navigation';
import Todoinput from '../components/Todoinput';
import Todoform from './Todoform';
import Item from './Item';
export const Mycontext = createContext()
export function TodoApp() {
  const [todos, setTodos] = useState([]);//main
  const [openform, setopenform] = useState(false);
  const navs = ['Today', 'Pending', 'Overdue'];
  const [todovalues, settodovalues] = useState({
    checked: '',
    title: '',
    priority: '',
    deadline: '',
    comments: '',
  });


  const EditTodo = (id) => {
    setopenform(!openform);
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      settodovalues({
        id: todo.id,
        title: todo.title,
        priority: todo.priority,
        deadline: todo.deadline,
        comments: todo.comments,
      });
    }
  };

 const [filterType, setFilterType] = useState(0);  
 const handleNavClick = (index) => {
    setFilterType(index);
  };
   
  return (
    <Mycontext.Provider value={{ EditTodo, setopenform, openform, settodovalues, filterType, setFilterType, handleNavClick, setTodos}}>
     
        <Header />
        <Navigation nav={navs} />
        <Todoinput/>
       
        <Item todos={todos}  setTodos={setTodos} />
        <Todoform
          show={openform}
          setopenform={setopenform}
          todovalues={todovalues}
          settodovalues={settodovalues}

        />
    
    </Mycontext.Provider>
  );
}


