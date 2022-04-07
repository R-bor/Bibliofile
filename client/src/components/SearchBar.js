import React from 'react';
import TextField from '@mui/material/TextField'; 
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search'; 
import "./SearchStyle.css"




export default function SearchBar() 
{ 
    return( 
        <div class="searchBar">
             <Box  sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField fullWidth id="input-with-sx" label="Search" variant="standard" />
            </Box>
        </div>
      )
}