import React, { useContext } from 'react';
import '../styles/Todoinputs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
import { faPlus } from '@fortawesome/free-solid-svg-icons'; 
import { Mycontext } from './TodoApp';


function Todoinput() {
  const{setopenform,openform,settodovalues,}=useContext(Mycontext)
  const Addnewtask=()=>{
    setopenform(!openform)
    settodovalues({
    checked:false,
    title:'',
    priority:'',
    deadline:'',
    comments:'',
    })
  

  }
  return (
    <div className='Todoinputs'>
        <h1>Tasks</h1>
        <div className='addtask' onClick={Addnewtask}>
        <span><FontAwesomeIcon icon={faPlus} /></span><span style={{marginLeft:"7px",display:"flex"}} className='add' >Add Task</span>  
        </div>
    </div>
  )
}

export default Todoinput;
