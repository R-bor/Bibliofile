import React from 'react' 
import * as AiIcons from 'react-icons/ai'; 
//import * as FaIcons from 'react-icons/fa';  
//import * as IoIcons from 'react-icons/io'; 

export const NavBarData = [ 
   { 
    title: 'Home', 
    path: '/dashboard', 
    icon: <AiIcons.AiFillHome/>, 
    className: 'nav-text'
   }, 
   { 
    title: 'My Lists', 
    path: '#', 
    icon: <AiIcons.AiFillBook/>, 
    className: 'nav-text'
   },  
   { 
    title: 'Search', 
    path: '/search', 
    icon: <AiIcons.AiOutlineSearch/>, 
    className: 'nav-text'
   }
]