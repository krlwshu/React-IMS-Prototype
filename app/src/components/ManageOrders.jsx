import React, { useState, useEffect } from "react";
import { Typography, Button, Stack } from "@mui/material";
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


function ManageOrders() {

  const [expanded, setExpanded] = React.useState(false);
  
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      await axios
        .post("/getOrders")
        .then(({data}) => {
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
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-12">

            <Typography variant="h3" component="h3" sx={{pb:5, fontWeight:400}}>
              Manage Orders
            </Typography>

          </div>
          <div class="col-lg-12">
 

              {data.map((row) => (
                <Accordion >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel3bh-header"
                  >
                    <Typography sx={{ width: '33%', flexShrink: 0, fontWeight: 800 }}>
                      Order : {row.id}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', fontWeight: 800 }}>Supplier : {row.company_name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Supplier</TableCell>
                            <TableCell>Supplier</TableCell>
                            <TableCell>Qty.</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>

                          </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                              key={row.name}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">{row.id}</TableCell>
                              <TableCell component="th" scope="row">{row.company_name}</TableCell>
                            <TableCell component="th" scope="row">{row.product_code}</TableCell>
                            <TableCell component="th" scope="row">{row.quantity}</TableCell>
                            <TableCell component="th" scope="row">{row.status}</TableCell>
                            <TableCell component="th" scope="row">

                              <Stack spacing={2} pt={2} direction="row">
                              <Button variant="text" color="success" variant="outlined">
                                Approve
                              </Button>
                              {/* <Button variant="text" color="warning" variant="outlined">
                                Partial
                              </Button> */}
                              <Button variant="text" color="error" variant="outlined">
                                Reject
                              </Button>
                              </Stack>

                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageOrders;

