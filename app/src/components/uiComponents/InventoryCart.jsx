import * as React from 'react';
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

//List
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import TextField from '@mui/material/TextField';

export default function InventoryCart(props) {

    const {openState,setOpenState, orderState, setOrderState} = props;
    console.log(orderState);


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpenState(false);
  };

  const list = (anchor) => (
    <StyledBox
    //   sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '30%' }}
      role="presentation"
    //   onClick={toggleDrawer(true)}
      onKeyDown={toggleDrawer(anchor, false)}
      >

          <Typography variant="h3" component="h2">
              Order
          </Typography>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {orderState.map(item => (
                  <React.Fragment>

                      <ListItem button key={item.prod_id}>
                          <ListItemAvatar>
                              <Avatar>
                                  <RouterIcon />
                              </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                              primary={item.description}
                              secondary={`${item.manufacturer} ${item.supplier_id}`}
                          />
        <TextField
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



