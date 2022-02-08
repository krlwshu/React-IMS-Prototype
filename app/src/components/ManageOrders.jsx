import React, { useState, useEffect } from "react";
import { Typography, Button, Stack, Alert } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {StyledContainer} from './uiComponents/styled/Order.styles';

function ManageOrders() {

  const [expanded, setExpanded] = React.useState(false);

  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      await axios
        .post("/getOrderItems", { supplierId: 0 })
        .then(({ data }) => {
          setData(data);
          setLoadingData(false);
        });
    }
    if (loadingData) {
      getData();
    }
  }, []);


  return (
    <div className="contact">
      <StyledContainer class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-12">

            <Typography variant="h4" component="h4" sx={{ pb: 5, fontWeight: 400 }}>
              Manage Ordered Items
            </Typography>

          </div>
          <div class="col-lg-12">


            {

              [...new Set(data.map(item => item.parent_order))].map(parent_order => (
                <Accordion key={parent_order}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel3bh-header"
                  >
                    <Typography sx={{ width: '33%', flexShrink: 0, fontWeight: 800 }}>
                      Order #{parent_order}
                    </Typography>
                    {/* <Typography sx={{ color: 'text.secondary', fontWeight: 800 }}>Supplier : {row.company_name}</Typography> */}
                  </AccordionSummary>
                  <AccordionDetails>
                    <OrderTable parent_order={parent_order} orderData={data} />
                  </AccordionDetails>
                </Accordion>
              ))}
          </div>
        </div>
        <Alert sx={{fontSize:'1.2rem'}} severity="info">Expand the orders to view and update items. <br/><b>Note:</b> Only partially available and new items can be cancelled. Approved items have already been fulfilled by supplier.
        </Alert>
      </StyledContainer>
    </div>
  );
}

export default ManageOrders;



function OrderTable(props) {

  const { parent_order, orderData } = props;
  const orderItems = orderData.filter(item => item.parent_order === parent_order);


  const handleApprove  = (itemId) => {
    console.log("approved");
    processItemOrderUpdate(itemId, "Approved");
  };

  const handleCancel  = (itemId) => {
    processItemOrderUpdate(itemId, "Canceled");
  };
  
// Send order to server (generic function)
const processItemOrderUpdate = (itemId, appStatus) => {
  axios.post('/processOrderApproveCancel', {item: itemId, appStatus:appStatus })
    .then((response) => {
      if (response.status) {
        console.log(response.data);
      }
      else {
        console.log("Error processing request");
      }
    })
    .catch(e => { console.log(e) })
};


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Line Item ID</TableCell>
            <TableCell>Supplier</TableCell>
            <TableCell>Supplier</TableCell>
            <TableCell>Requested Qty.</TableCell>
            <TableCell>Available from Supplier</TableCell>
            <TableCell>Fulfilment Status</TableCell>
            <TableCell>IM Approval Status</TableCell>
            <TableCell>Line Item Action</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {
            orderData.filter(item => item.parent_order === parent_order).map(subItems => (

              <TableRow
                key={subItems.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{subItems.id}</TableCell>
                <TableCell component="th" scope="row">{subItems.company_name}</TableCell>
                <TableCell component="th" scope="row">{subItems.product_code}</TableCell>
                <TableCell component="th" scope="row">{subItems.requested_quantity}</TableCell>
                <TableCell component="th" scope="row">{subItems.requested_quantity}</TableCell>
                <TableCell component="th" scope="row">{subItems.supplier_approval_status}</TableCell>
                <TableCell component="th" scope="row"><b>{subItems.im_approval}</b> </TableCell>
                <TableCell component="th" scope="row">


                <Stack spacing={2} pt={2} direction="row">
                  {(subItems.supplier_approval_status === "Partial" && subItems.im_approval != 'Approved')  &&
                  
                      <Button variant="text" onClick={() => handleApprove(subItems.id)} color="success" variant="outlined">
                        Approve
                      </Button>
                  }
                      {
                    subItems.supplier_approval_status !== "Approved"   &&
                      <Button variant="text"  onClick={() => handleCancel(subItems.id)} color="error" variant="outlined">
                        Cancel
                      </Button>
                  }                      
                    </Stack>


                </TableCell>
              </TableRow>


            ))
          }

        </TableBody>
      </Table>
    </TableContainer>
  )
}

