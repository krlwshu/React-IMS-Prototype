import styled from "styled-components";
import { Card } from "@mui/material";

export const Wrapper = styled.div`
  margin: 40px;
//   margin-right:200px;
`;


export const OrdersFeed = styled.div`
    margin: 0;
    padding: 0;
    width: 400px;
    padding:1rem;
    background-color: #f1f1f1;
    position: relative;
    height:800px;
    overflow-y:auto;
    float:right;
    display:block;
    right:0;
    top:0;
    top:60px;
    z-index:-1;
    background-color:white;
    box-shadow:6px 6px 16px 0px;
`;


export const StyledCard = styled(Card)`
    &&&{
        background-color:purple;
        border-radius:10px;
        font-weight:400;
    }



`
