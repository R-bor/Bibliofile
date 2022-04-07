import React  from "react"; 
import "./Button.css" 
import AddIcon from '@mui/icons-material/Add'; 
import Button from '@mui/material/Button';

export default function AddButton() 
{ 
   return(
    <div className="addButtonContainer">
        <Button className="addButton" disableRipple variant="contained" color="success"><AddIcon fontSize='large' className="addIcon"/></Button>
    </div>
   )
}