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
        select
        oi.id as id,
        o.id as parent_order,
        s.company_name,
        p.product_code,
        oi.requested_quantity,
        oi.supplier_approval_status,
        p.manufacturer,
        IF(oi.supp_avail_qty IS null, oi.requested_quantity, oi.supp_avail_qty) AS available
        FROM orders o

        JOIN order_items oi ON o.id = oi.order_id
        JOIN products p ON p.id = oi.id_product
        JOIN suppliers s ON s.id = o.id_supplier
        `;


      //Get header data from db and create object tree
      let products = await runQuery(productSql);
      res.status(200).json(products);
    } catch (e) {
      res.sendStatus(500);
    }
  });

// Handles Approve, Reject and Partial approvals 
  // if full Approve, updates current stock level
  app.post('/processOrderItem', async (req, res) => {
    const status = { action: 'Process Order', process_status: null, stock_update: null };
    const data = req.body;
    

    try {
      const order = await updateOrder(data);
      const inventory = await updateInventoryByOrderId(data.item_order_id, data.app_qty);
      res.status(200).json([order, inventory]);
    } catch (e) {
      console.log("Error updating order");
      res.status(500).json(e)
    }

  }
);


const updateOrder = (data) => new Promise((resolve, reject) => {
  
  const {app_status, app_qty, item_order_id} = data;
  let sql = `
    update order_items 
    set supplier_approval_status = ?,
    supp_avail_qty = ?
    where id = ?`

  db.query(sql, [app_status, app_qty, item_order_id], (err, results) => {
    if (err) {
      console.log(err);
      return reject(false)
    } else {
      console.log("Order_items updated");
      return resolve("Order Updated");
    }
  });

  
});

// Update inventory levels
const updateInventoryByOrderId = (order, qty) => new Promise((resolve, reject) => {
  
  let approvalFlag = "Approved";
  let sql = `
  update products set qty_avail = (qty_avail + ?) WHERE id IN 
  (SELECT id_product FROM order_items WHERE id = ? and  supplier_approval_status = ?);
  `

  console.log(order);

  db.query(sql, [qty, order, approvalFlag], (err, results) => {
    if (err) {
      console.log(err);

      return reject(false)
    } else {
      return resolve("Stock Updated");
    }
  });
});




// Get Supplier Details (Form)

app.post('/getSuppliersProductTypes', async (req, res) => {
    
  try {

    let productSql = `
    SELECT s.id, s.company_name, p.category, p.manufacturer FROM suppliers s
    LEFT JOIN products p ON s.id = p.supplier_id
    GROUP BY company_name, category, manufacturer
    ORDER BY s.id
      `;

    //Get header data from db and create object tree
    let products = await runQuery(productSql);
    res.status(200).json(products);
  } catch (e) {
    res.sendStatus(500);
  }
});



// Create new product

app.post('/createNewProduct', async (req, res) => {

  const data = req.body;
  try {
    const newProduct = await createNewProduct(data);
    res.status(200).json([newProduct]);
  } catch (e) {
    console.log("Error updating order");
    res.status(500).json(e)
  }

});

const createNewProduct = (data, qty) => new Promise((resolve, reject) => {

  let {code, desc, type, manu} = data.formState;
  let supplierId = data.supplierId;

  let newProductSql = `
  insert into products (supplier_id, category, product_code, description, manufacturer) values 
  (?,?,?,?,?)
  `;

  db.query(newProductSql, [supplierId, type, code, desc, manu], (err, results) => {
    if (err) {
      console.log(err);
      return reject(false)
    } else {
      return resolve("New Product Created!");
    }
  });
});


// Get order updates - dashboard feed

app.post('/getOrderUpdates', async (req, res) => {
    
  try {

    let productSql = `
      SELECT 
      o.id, 
      o.status, 
      p.category, 
      p.product_code, 
      p.description, 
      oi.requested_quantity, 
      p.manufacturer,
      oi.supplier_approval_status, 
      oi.supp_avail_qty, 
      oi.last_updated FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN suppliers s ON s.id = o.id_supplier
      JOIN products p ON oi.id_product = p.id        
      `;


    //Get header data from db and create object tree
    let products = await runQuery(productSql);
    res.status(200).json(products);
  } catch (e) {
    res.sendStatus(500);
  }
});



// Generic query getter
  const runQuery = (sql) => new Promise((resolve, reject) => {
    db.query(sql,
      (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      });
  });
  