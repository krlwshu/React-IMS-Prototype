import React from 'react';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { StyledSearchInput } from './styled/inventory-table';

export default function SearchButton(props) {
    return <StyledSearchInput>
        <div className='search-btn' type="submit"><ManageSearchIcon sx={{mt:1}} /></div>
        <div className='search-field'>

            <input class="input-field"
                type="text"
                placeholder={props.placeholder}
                onChange={props.onChange}
            />
        </div>
    </StyledSearchInput>;
}
