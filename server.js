const express = require('express'); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3

const mysql = require('mysql');
const cors = require('cors');

app.listen(port, () => console.log(`Listening on port ${port}`));

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'ims_proto',
  });




// Get data from DB

app.post('/getProducts', (req, res) => {
    db.query('select * from products', (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  });


// Test BE
app.get('/express_backend', (req, res) => { 
  res.send({ express: 'Hello, world' });
}); 