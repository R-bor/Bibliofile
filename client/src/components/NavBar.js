import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa'; 
import {Link} from 'react-router-dom'; 
import * as AiIcons from 'react-icons/ai';
import {NavBarData} from './NavBarData'; 
import './NavBar.css'; 
import {IconContext} from 'react-icons'

function NavBar() { 
    
    const [sidebar, setSideBar] = useState(false); 
    const showSidebar = () =>setSideBar(!sidebar); 

    return (
        <> 
        <IconContext.Provider value={{color:'#fff'}}>
            <div className="navbar">
                <Link to="#" className='menu-bars'>
                    <FaIcons.FaBars onClick={showSidebar}/>
                </Link>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <li className='navbar-toggle'>
                        <Link to='#' className='menu-bars'>
                            <AiIcons.AiOutlineClose/>
                        </Link>
                    </li> 
                    {NavBarData.map((item,index) =>{ 
                        return(
                            <li key={index} className={item.className}> 
                                <Link to={item.path}>
                                {item.icon}
                                <span>{item.title}</span>  
                                </Link> 
                            </li>
                        )
                    })}
                </ul>
            </nav> 
            </IconContext.Provider>
        </>
    );
}

export default NavBar;
