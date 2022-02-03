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