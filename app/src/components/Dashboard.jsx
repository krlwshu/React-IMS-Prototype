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


  const [loadingDataAlerts, setLoadingDataAlerts] = useState(true);
  const [alertingData, setAlertingData] = useState([]);

  useEffect(() => {
    async function getData() {
      await axios
        .post("/getAlerting")
        .then(({ data }) => {
          setAlertingData(data);
          setLoadingDataAlerts(false);
        });
    }
    if (loadingDataAlerts) {
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
                <HourglassBottomOutlinedIcon color="primary" sx={{ fontSize: 40 }} aria-label="">
                </HourglassBottomOutlinedIcon>
                <Typography sx={{ pl: 5 }} variant="h5" component="h5" color="primary">Awaiting IM Approval</Typography>
              </Stack>
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

                {
                  data.filter((item) => item.supplier_approval_status == 'Partial').map(item =>
                  (

                    <React.Fragment>
                      <ListItem key={item.id}>
                        <ListItemAvatar>
                          <Avatar>
                            <RouterIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={`#${item.id} ${item.company_name}`}
                          secondary={`${item.supp_avail_qty}/${item.requested_quantity} available (${item.product_code})`}
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  )
                  )
                }

              </List>
            </Card>
          </div>
          <div className="col-lg-3">
            <Card sx={{ p: 5, radius: 5 }}>

              <Stack direction="row">
                <HourglassBottomOutlinedIcon color="secondary" sx={{ fontSize: 40 }} aria-label="">
                </HourglassBottomOutlinedIcon>
                <Typography sx={{ pl: 5 }} variant="h5" component="h5" color="secondary">Awaiting Supplier Response</Typography>
              </Stack>
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

                {
                  data.filter((item) => item.supplier_approval_status == 'New').map(item =>
                  (

                    <React.Fragment>
                      <ListItem key={item.id}>
                        <ListItemAvatar>
                          <Avatar>
                            <RouterIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={`#${item.id} ${item.company_name}`}
                          secondary={`${item.requested_quantity} items requested (${item.product_code})`}
                        />
                      </ListItem>
                      <Divider />

                    </React.Fragment>
                  )
                  )
                }

              </List>
            </Card>
          </div>          
          <div className="col-lg-6">
            <Card sx={{ p: 5, radius: 5 }}>

              <Stack direction="row">
                <WarningAmberIcon sx={{ fontSize: 40, color: 'orange' }} aria-label="">
                </WarningAmberIcon>
                <Typography sx={{ color: 'orange', pl: 5 }} variant="h5" color="primary">Low Quantity Alerts</Typography>
              </Stack>
              <List sx={{ width: '100%', bgcolor: 'background.paper' }}>

                {
                  alertingData.map(item =>
                  (

                    <React.Fragment>
                      <ListItem key={item.id}>
                        <ListItemAvatar>
                          <Avatar>
                            <RouterIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={`${item.manufacturer} - ${item.description} `}
                          secondary={`${item.qty_avail} items remaining - alert if below: ${item.alert_level}`}
                        />
                      </ListItem>
                      <Divider />

                    </React.Fragment>
                  )
                  )
                }

              </List>
            </Card>

          </div>

        </div>


      </Wrapper>


    </React.Fragment>




  );
}


