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

import { Box, Stack } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function InventoryCart(props) {

    const { openState, setOpenState, orderState, setOrderState } = props;
    
    useEffect(() => {
    
    }, [orderState]);
    

    const handleSubmit = () => {
        setOpenState(false)
        setOpen(false);
    };
    
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpenState(false);
    };

    const itemCount = orderState.length? orderState.map(item => item.qty).reduce((prev, next) => prev + next) : 0;

    const list = (anchor) => (
        <StyledBox
            role="presentation"
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Box sx={{ m: 3 }} >
                <Typography variant="h4" component="h3">
                    Order New Items({itemCount})
                </Typography>
            </Box>
            
            <Grid container spacing={2}>

            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {orderState.map(item => (
                    <React.Fragment>

                        <ListItem sx={{ pl: 4, pb: 2 }} key={item.prod_id} button key={item.prod_id}>
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
                                InputLabelProps={{
                                    shrink: true,
                                }}
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
                        <Alert severity="info">The supplier will be notified by email. You can view updates in manage orders section.</Alert>
                    <Stack spacing={2} pt={2} direction="row">
                        <Button variant="contained" onClick={handleClickOpen}>Submit</Button>
                        <Button variant="outlined">Remove All Items</Button>
                    </Stack>
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
                        <Alert severity="info">The supplier will be notified by email. You can view updates in manage orders section.</Alert>
                    </DialogContentText>
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



