import React, { useState, useEffect } from "react";
import { Typography, Button, Tooltip, Stack, Alert } from "@mui/material";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function ManageProducts() {

  const [data, setData] = useState([]);


  async function getData() {
    await axios
      .post("/getSuppliersProductTypes")
      .then(({ data }) => {
        setData(data);
      });
    console.log("fetched")
  }


  useEffect(() => {

    getData()
  }, [])


  const defaultFormState = { supplier: '', type: '', desc: '', manu: '', code: '', alert:0};
  const [formState, setFormState] = React.useState(defaultFormState);
  const [disabledState, setDisabledState] =
    React.useState(
      {
        supplier: false,
        type: false,
        desc: false,
        manu: false,
        code: false,
        alert: false,
        textFieldDisabled: true,
        errors:0,
        submitState: false,
        alert:{severity:'error', message:'Faled to create new product',hidden:true }
      });


  const handleFormChange = (e) => {
    formState[e.target.id] = e.target.value;
    setFormState({ ...formState });

    // Unlock form (or not)
    if (formState.supplier && formState.type) {
      disabledState.textFieldDisabled = false;
    } else {
      disabledState.textFieldDisabled = true;
    }
    if(e.target.value === '') {
      disabledState[e.target.id] = true;
      disabledState.errors ++;
    }

    setDisabledState({ ...disabledState });
    console.log(disabledState.errors);
  };



const handleSubmit = () => {
  validateForm();
  
  if(disabledState.errors === 0 ){
    let supplierId = data.find(item => item.company_name === formState.supplier).id

    axios.post('/createNewProduct', {formState,supplierId })
    .then((response) => {
      if (response.status) {
        console.log(response.data);
        disabledState.submitState = true;
        disabledState.alert.hidden = false;
        disabledState.alert.severity = "success";
        disabledState.alert.message = response.data;
        setDisabledState({ ...disabledState });         
      }
      else {
        console.log("Error processing request");
      }
    })
    .catch(e => { console.log(e) })
  }

  setFormState({ ...formState });

};

  const validateForm = () => {

    disabledState.errors = 0;

    Object.keys(formState).forEach(key =>{
      if(formState[key] === ''){
        disabledState[key] = true;
        disabledState.errors ++;
      } else {
        disabledState[key] = false;
      }
      setDisabledState({ ...disabledState }); 
  });

    
  };
  
  return (
    <div className="contact">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-12">
            <Typography variant="h4" component="h4">
              Add New Products
            </Typography>
            <p></p>


            {/* <Button size="small" variant="outlined" color="info">
              <ArrowBackIcon size="small"/> Back
            </Button> */}
            <Box
              component="form"
              sx={{ pt:3,
                '& .MuiTextField-root': { m: 1, width: '100%' },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <Tooltip title="Only Approved Suppliers" placement="right">
                  <Autocomplete
                    onSelect={(e) => handleFormChange(e)}
                    options={[...new Set(data.map(item => item.company_name))]}
                    renderInput={(params) => <TextField {...params} label="Select Approved Supplier" />}
                    id="supplier"
                  />
                </Tooltip>
                <Tooltip title="Select from list or enter free text" placement="right">
                  <Autocomplete
                    id="type"
                    onSelect={(e) => handleFormChange(e)}
                    options={[...new Set(data.map(item => item.category))]}
                    renderInput={(params) => <TextField {...params} label="Product Type" />}
                    placeholder="Search within list, or enter new category"
                  />
                </Tooltip>
              </div>
              <div>
                <TextField
                  disabled={disabledState.textFieldDisabled}
                  id="code"
                  error={disabledState.code}
                  label="Product Code"
                  variant="filled"
                  onChange={(e) => handleFormChange(e)}
                  // disabled={formValidState.disabled}
                />
                <TextField
                  disabled={disabledState.textFieldDisabled}
                  error={disabledState.desc}
                  // id="filled-error"
                  label="Product Description"
                  variant="filled"
                  id="desc"
                  onChange={(e) => handleFormChange(e)}
                />
                <TextField
                  disabled={disabledState.textFieldDisabled}
                  error={disabledState.manu}
                  // id="filled-error"
                  label="Manufacturer"
                  variant="filled"
                  id="manu"
                  onChange={(e) => handleFormChange(e)}
                />
                <Tooltip title="Get notified when levels are running low" placement="right">

                  <TextField sx={{ pt: 2, min: 0 }}
                    disabled={disabledState.textFieldDisabled}
                    error={disabledState.alert}
                    label="Stock Alert Level"
                    type="number"
                    variant="filled"
                    id="alert"
                    InputProps={{ inputProps: { min: 0 } }}
                    value={formState.alert}
                    onChange={(e) => handleFormChange(e)}
                  />

                </Tooltip>
              </div>

            </Box>
            <Stack sx={{width:'100%', pt:10}} >
              <Button sx={{width:250}} variant="outlined"  onClick={handleSubmit} hidden={disabledState.submitState} color="success">Create New Product</Button>
              <Alert hidden={disabledState.alert.hidden} severity={disabledState.alert.severity}>{disabledState.alert.message}</Alert>
            </Stack>

          </div>
        </div>
      </div>
    </div >
  );
}

export default ManageProducts;
