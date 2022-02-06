import React, { useState, useEffect } from "react";
import axios from 'axios';

import { Typography, Card, Grid, Box, Button,  Paper, Avatar, IconButton, Stack, Divider } from '@mui/material';
import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import RouterIcon from '@mui/icons-material/Router';
import { Wrapper, StyledCard } from "./uiComponents/styled/Dashboard-styles";
import { styled } from '@mui/material/styles';

// icons
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FiberNewIcon from '@mui/icons-material/FiberNew';



export default function Dashboard() {

  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      await axios
        .post("/getOrderUpdates")
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
    <React.Fragment>

      <Wrapper className="dashboard">

        {/* <h1>Dashboard</h1> */}
        <div class="row ">

          <div className="col-lg-3">
            <Card sx={{ p: 5, radius: 5 }}>

              <Stack direction="row">
                <HourglassBottomOutlinedIcon color="primary" sx={{ fontSize: 50 }} aria-label="">
                </HourglassBottomOutlinedIcon>
                <Typography sx={{ pl: 5 }} variant="h4" color="primary">Top Products</Typography>
              </Stack>
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <WorkIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Work" secondary="Jan 7, 2014" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <RouterIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Vacation" secondary="July 20, 2014" />
                </ListItem>
              </List>
            </Card>


          </div>
          <div className="col-lg-5">
            <Card sx={{ p: 5, radius: 5 }}>

              <Stack direction="row">
                <HourglassBottomOutlinedIcon sx={{ fontSize: 50, color: 'orange' }} aria-label="">
                </HourglassBottomOutlinedIcon>
                <Typography sx={{ color: 'orange', pl: 5 }} variant="h4" color="primary">Pending Orders</Typography>
              </Stack>
              <Box sx={{ p: 5 }}>
                Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim
                labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi
              </Box>
            </Card>

            <Card sx={{ p: 5, radius: 5 }}>

              <Stack direction="row">
                <DoneOutlineOutlinedIcon sx={{ fontSize: 50, color: 'lightgreen' }} aria-label="">
                </DoneOutlineOutlinedIcon>
                <Typography sx={{ color: 'lightgreen', pl: 5 }} variant="h4" color="primary">Approved Orders</Typography>
              </Stack>
              <Box sx={{ p: 5 }}>
                Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim
                labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi
              </Box>
            </Card>


          </div>
          <div className="col-lg-4">
            <StyledCard >

            <Stack sx={{ p: 5 }} direction="row">
              <HourglassBottomOutlinedIcon sx={{ fontSize: 40, color:'white' }} />
              <Typography  sx={{ ml: 5, color:'white' }}variant="h4" color="whi">Orders Status Feed</Typography>
            </Stack>
            <List sx={{  bgcolor: 'background.paper' }}>
            {/* <Grid container spacing={2}>
            <Grid item xs={2}>             </Grid>
            <Grid item sx={{fontWeight:700}} xs={6}>Part</Grid>
            <Grid item sx={{fontWeight:700}} xs={4}>Quantity</Grid>
            <Divider />
              </Grid> */}
              {data.map(item => (
                <React.Fragment>

                  <ListItem>


                    <Grid container spacing={2}>
                      <Grid item xs={2}>
                        {(item.supplier_approval_status == 'Approved') &&
                          <CheckCircleIcon variant="outlined" sx={{color:'lightgreen', fontSize:50 }} />
                        }

                        {(item.supplier_approval_status == 'Partial') &&
                          <WarningAmberIcon variant="outlined" sx={{ color: 'orange', fontSize:50 }} />
                        }
                        {(item.supplier_approval_status != 'Partial' && item.supplier_approval_status != 'Approved') &&
                          <FiberNewIcon  sx={{ fontSize:50 }} variant="outlined" color="info" />
                        }                     

                      </Grid>
                      <Grid item xs={6}>
                        {`${(item.supp_avail_qty)? item.supp_avail_qty : 0} / ${item.requested_quantity}`}
                        <ListItemText primary={`Product: ${item.product_code}`} secondary={`Vendor: ${item.manufacturer}`} />
                      </Grid>
                      <Grid item xs={4}>
                         {(item.supplier_approval_status === 'Partial' ) && "Action Required"} <br/><b> Order#:</b> {item.id} 
                      </Grid>
                    </Grid>
                    
                  </ListItem>
                  <Divider />
                </React.Fragment>

              ))}
            </List>              
            </StyledCard>
          </div>
        </div>


      </Wrapper>


    </React.Fragment>




  );
}


