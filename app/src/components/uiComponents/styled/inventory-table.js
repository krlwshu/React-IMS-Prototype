import styled from 'styled-components';

//Main wrapper for inventory table

export const styledInvList = styled.div`
  padding: 1rem;
  

  table {
    border-spacing: 0;
    // border: 1px solid black;
    min-width:100%;

    th {  
      white-space: nowrap;
      :first-child{
        font-weight:bold;
      }      
    }

    th,
    td {
      margin: 0;
      padding: 1rem;
      border-bottom: 1px solid lightgrey;
      // border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
      :nth-child(1){
        font-weight:600;
      }
    }

    .desc {
      -width:1000px;
    }
  }
`


export const StyledSearchInput = styled.div`

&&&{  
  width:100%;

  background-color:green;
  height:3rem;
  border-radius:5px;
  display:flex;
  

  div.search-btn {
    width:5%;
    height:100%;
    border:none;
    background-color:inherit;
    background-color:#56d8ff;
    border-radius: 5px 0 0px 5px;
    float:left;
    justify-content: center;
    display:flex;
  }


  div.search-field {
    
    background-color:white;
    display:inline;
    width:100%;
    input{
      margin-left:5rem;
      width:40%;
      margin-top:12px;
      border:none;
    }
    input:focus{
      border:none;
      outline:none;
    }
    input::placeholder{
      color:lightgrey;
    }    
  }

}


`
