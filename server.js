const express = require('express'); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3

const mysql = require('mysql');
const cors = require('cors');

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'ims_proto',
  });




// Get data from DB

// app.post('/getProducts', (req, res) => {



//     db.query(sql, (err, result) => {
//       if (err) {
//         res.send(err);
//       } else {
//         res.send(result);
//       }
//     });
//   });


  app.post('/getProducts', async (req, res) => {
    try {
  
      let productSql = `
      SELECT 
      p.id, 
      category, 
      product_code, 
      manufacturer,
      product_code,
      description,
      qty_avail,
      s.company_name as supplier
      
      FROM products p
      LEFT JOIN suppliers s ON
      p.supplier_id = s.id`;
  
      //Get header data from db and create object tree
      let products = await runQuery(productSql);
      res.status(200).json(products);
    } catch (e) {
      res.sendStatus(500);
    }
  });

  app.post('/getOrderItems', async (req, res) => {
    
    try {

      let productSql = `
      SELECT 
        oi.id as id,
        o.id as parent_order,
        s.company_name,
        p.product_code,
        oi.quantity,
        oi.supplier_approval_status,
        p.manufacturer
        FROM orders o

        LEFT JOIN order_items oi ON o.id = oi.order_id
        LEFT JOIN products p ON p.id = oi.id_product
        LEFT JOIN suppliers s ON s.id = o.id_supplier
        `;


      //Get header data from db and create object tree
      let products = await runQuery(productSql);
      res.status(200).json(products);
    } catch (e) {
      res.sendStatus(500);
    }
  });

// Approve Item
app.post('/manageOrderItemApproval', (req, res) => {
  const { item_order_id, app_status} = req.body;
  const sql = 'update order_items set supplier_approval_status = ? where id = ?';

  console.log(req.body.item_order_id);
  // res.send(req.body);
  db.query(sql, [app_status, item_order_id], (err, results) => {
    if (err) {
      res.send({ status: false, text: 'Something went wrong... ' });
    } else {
      res.send({ status: true, text: `Updated ${results.affectedRows}` });
    }
  });
});



  const runQuery = (sql) => new Promise((resolve, reject) => {
    db.query(sql,
      (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      });
  });
  




// Test BE
app.get('/express_backend', (req, res) => { 
  res.send({ express: 'Hello, world' });
}); 