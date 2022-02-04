import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import {Typography, Button, Stack} from '@mui/material'
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';





export default function DataTable() {


  const columns = [
    { field: 'id', headerName: 'Item Order Number', width: '200' },
    { field: 'product_code', headerName: 'Product Code', width: 130 },
    { field: 'manufacturer', headerName: 'Manufacturer', width: 130 },
    { field: 'quantity', headerName: 'Qty. Requested', width: 130 },
    {
      field: 'supplier_approval_status',
      headerName: 'Status',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160
    },
    {
      field: 'action',
      headerName: 'Action',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      filterable:false,
      width: 300,
      renderCell: (row) => {
        return (
          <Stack direction="row">
            <IconButton aria-label="delete">
              <CheckCircleOutlineIcon color="success" onClick={() => handleItemAppRej(row.id,"Approved")} />
            </IconButton>
            <IconButton aria-label="delete" >
              <DeleteIcon color="error" onClick={() => handleItemAppRej(row.id, "Rejected")} />
            </IconButton>
          </Stack>
        );
      }
    },
  ];  


  // Process change
  const [reloadState,setReloadState] = React.useState(false);
  const handleItemAppRej = (id, status) => {
    console.log("Triggered");

    axios.post('/manageOrderItemApproval', { item_order_id: id, app_status: status })
      .then((response) => {
        if (response.data.status) {
          setReloadState(true);
        }
        else {
          console.log("Error processing request");
        }
      })
      .catch(e => { console.log(e) })

      getData();
  };

// Load Data

    async function getData() {
      await axios
        .post("/getOrderItems")
        .then(({ data }) => {
          setData(data);
          setLoadingData(false);
          setReloadState(false);
        });
        console.log("fetched")
    }
    

    useEffect(()=>{
    
      getData()
  })

  const [expanded, setExpanded] = React.useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState([]);




  return (


<div className="contact">
<div class="container">
  <div class="row align-items-center my-5">
    <div class="col-lg-12">

      <Typography variant="h3" component="h3" sx={{pb:5, fontWeight:400}}>
        Manage Orders
      </Typography>

    </div>
    <div class="col-lg-12">

    <div style={{ height: 400, width: '100%' }}>
      <DataGrid 
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        isRowSelectable={false}
        // checkboxSelection

      />
    </div>
    </div>
  </div>
</div>
</div>
  );
}
