import React, { useContext, useState } from 'react';
import '../styles/navbars.css';
import { Mycontext } from './TodoApp';

function Navigation({ nav }) {
  const { setFilterType } = useContext(Mycontext);
  const [activeIndex, setActiveIndex] = useState(0);  

  const handleClick = (index) => {
    setActiveIndex(index); 
    setFilterType(index);  
  };

  return (
    <div className='navbars'>
      {nav.map((navigations, index) => (
        <p
          className={`navbar ${activeIndex === index? 'active' : '' }`}
          key={index}
          onClick={() => handleClick(index)}
        >
          {navigations}
        </p>
      ))}
    </div>
  );
}

export default Navigation;