import NavBar from './NavBar'
import React from 'react' 
import BookItem from './BookItem' 
import DashboardData from './DashboardData'


export default function Dashboard() { 
    
    return (
        <div> 
            <NavBar/> 
            <DashboardData/>
        </div>
    )
};
