import React, { useState, useEffect } from "react";
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Typography from '@mui/material/Typography'
import { StyledBox } from "./styled/Order.styles";
import RouterIcon from '@mui/icons-material/Router';
import Grid from '@mui/material/Grid';

//List
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';


//Modal
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import axios from 'axios';

import { Box, Stack } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function InventoryCart(props) {

    const { openState, setOpenState, orderState, setOrderState } = props;
    
    useEffect(() => {
    
    }, [orderState]);
    

    const [orderProcessStatus, setOrderProcessStatus] = React.useState({orders:[], showAlert: false})
    const handleSubmit = () => {

        axios.post('/submitOrder', orderState)
            .then((response) => {
                if (response) {
                    orderProcessStatus.showAlert = true;
                    orderProcessStatus.orders = [...new Set(response.data.map(item => item.orderId))];
                    setOrderProcessStatus(orderProcessStatus)
                    setOrderState([]);
                }
                else {
                    console.log("Error processing request");
                }
            })
            .catch(e => { console.log(e) })
        setOpen(false);
    };
    
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const [totalQty, setTotalQty] = React.useState(0);
    const handleChangeQty = (e, prod_id) => {
        setOrderState((prev) => {
          const itemId = prev.find((item) => item.id === prod_id);
    
          if (itemId) {
            return prev.map((item) =>
              item.id === prod_id
                ? { ...item, qty: e.target.value }
                : item
            );
          }
        });
        console.log(orderState);

        
    };
    


    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpenState(false);
    };

    
    const itemCount = orderState.length? orderState.map(item => item.qty).reduce((prev, next) => parseInt(prev) + parseInt(next)) : 0;

    const list = (anchor) => (
        <StyledBox
            role="presentation"
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Box sx={{ m: 3 }} >
                <Typography variant="h4" component="h3">
                    Order New Items ({itemCount})
                </Typography>
            </Box>
            
            <Grid container spacing={2}>

            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {orderState.map(item => (
                    <React.Fragment key={item.id}>

                        <ListItem key={item.id} sx={{ pl: 4, pb: 2 }} key={item.prod_id} button key={item.prod_id}>
                            <ListItemAvatar>
                                <Avatar>
                                    <RouterIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={item.description}
                                secondary={`Man: ${item.manufacturer} - Supplier: ${item.supplier}`}
                                />
                            <TextField edge="end"
                                id="standard-number"
                                type="number"
                                onChange={(e)=>handleChangeQty(e,item.prod_id)}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                inputProps={{min:0}}
                                variant="standard"
                                defaultValue={item.qty}
                                />
                        </ListItem>
                        <Divider />

                    </React.Fragment>
                ))}
            </List>

                </Grid>            

            <Box sx={{ m: 3 }} >

                <Typography variant="h3" component="h2">
                        <Alert hidden={true} severity="info">Orders</Alert>
                    <Stack hidden={orderProcessStatus.showAlert} spacing={2} pt={2} direction="row">
                        <Button variant="contained" onClick={handleClickOpen}>Submit</Button>
                        <Button variant="outlined">Remove All Items</Button>
                    </Stack>
                    <Alert hidden={!orderProcessStatus.showAlert} severity="success">
                        Order processed! Order IDs: 
                        {orderProcessStatus.orders.join(", ")}</Alert>
                </Typography>
            </Box>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Confirm Order Submission?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                    </DialogContentText>
                        <Alert severity="info">The supplier will be notified by email. You can view updates in manage orders section.</Alert>
                </DialogContent>
                <DialogActions>
                    <Button color="success" variant="outlined" onClick={handleSubmit}>OK</Button>
                    <Button color="error" variant="contained" onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>            
        </StyledBox>
    );

    let anchor = 'right';
    return (
        <div>
            <React.Fragment key={anchor}>

                <Drawer
                    anchor={anchor}
                    open={openState}
                    onClose={toggleDrawer(anchor, false)}
                >
                    {list(anchor)}
                </Drawer>
            </React.Fragment>
        </div>
    );
}



