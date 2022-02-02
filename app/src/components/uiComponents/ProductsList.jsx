import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'category', headerName: 'First name', width: 130 },
  { field: 'product_code', headerName: 'Code', width: 130 },
  { field: 'description', headerName: 'Summary', width: 130 },
];


export default function DataTable() {

  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      await axios
        .post("/getProducts")
        .then((response) => {
          setData(response.data);
          setLoadingData(false);
        });
    }
    if (loadingData) {
      getData();
    }
  }, []);




  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
