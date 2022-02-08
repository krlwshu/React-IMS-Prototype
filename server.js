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
      s.id as supplier_id,
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

  // TEMP FOR PROTO
  const { supplierId } = req.body;
  console.log(supplierId);
  //

  let filter = (supplierId != 0) ?  ` where s.id = ${supplierId} ` : '';

  try {

    
    let productSql = `
        select
        oi.id as id,
        o.id as parent_order,
        DATE_FORMAT(o.date_created, '%Y-%d-%d %H:%i') as date_created,
        s.company_name,
        p.product_code,
        oi.requested_quantity,
        oi.supplier_approval_status,
        p.manufacturer,
        oi.supp_avail_qty,
        IF(oi.supp_avail_qty IS null, oi.requested_quantity, oi.supp_avail_qty) AS available
        FROM orders o

        JOIN order_items oi ON o.id = oi.order_id
        JOIN products p ON p.id = oi.id_product
        JOIN suppliers s ON s.id = o.id_supplier

        ${filter}
        order by o.date_created asc
        `;

    // TEMP FOR PROTO
    
    //
    console.log(productSql);

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

  const { app_status, app_qty, item_order_id } = data;
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

  let { code, desc, type, manu } = data.formState;
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
      s.company_name,
      o.date_created,
      p.qty_avail,
      p.alert_level,
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





// Submit inventory order


// Create new orders

app.post('/submitOrder', async (req, res) => {

  const orderData = req.body;
  let uniqueSuppliers = [...new Set(orderData.map(item => item.supplier_id))]
  let ordersCreated = [];


  // Create orders and append items
  try {
    for (const supplier of uniqueSuppliers) {
      //Create the order
      let status = { orderId: await createNewOrder(supplier) };

      // Filter, then create items
      let orderItems = orderData.filter(item => item.supplier_id === supplier)
        .map(item => [item.prod_id, item.qty, status.orderId]);
      status.itemOrderStatus = await createOrderItems(orderItems);

      // Update status to send back to client
      ordersCreated.push(status);
    }

    res.status(200).json(ordersCreated);
  } catch (e) {
    console.log("Error placing order");
    res.status(500).json(e)
  }

});

const createNewOrder = (supplier) => new Promise((resolve, reject) => {

  let createOrderSQl = `
    insert into orders (id_supplier) values (?)
  `;

  db.query(createOrderSQl, [supplier], (err, results) => {
    if (err) {
      console.log(err);
      return reject(false)
    } else {
      notifySupplierByEmail(results.insertId);
      return resolve(results.insertId);
    }
  });
});

const createOrderItems = (orderItems) => new Promise((resolve, reject) => {

  let createOrderSQl = `
    insert into order_items (id_product, requested_quantity, order_id) values ?
  `;

  db.query(createOrderSQl, [orderItems], (err, results) => {
    if (err) {
      console.log(err);
      return reject(false)
    } else {
      return resolve("success");
    }
  });
});








async function notifySupplierByEmail(order){
  var nodemailer = require('nodemailer');
  let getSuppContact = `SELECT
      contact_email, s.id, company_name FROM orders o
      LEFT JOIN suppliers s ON s.id = o.id_supplier
      WHERE o.id = ${order}`;

  var supp = await runQuery(getSuppContact)


  // Create the transporter with the required configuration for Outlook
  // change the user and pass !
  var transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
      ciphers: 'SSLv3'
    },
    auth: {
      user: "imsdemosystem@outlook.com",
      pass: "ImsDemo!!!"
    }
  });

  console.log(supp[0].contact_email);
  // setup e-mail data, even with unicode symbols
  var mailOptions = {
    from: '"Admin Team " <imsdemosystem@outlook.com>', // sender address (who sends)
    to: supp[0].contact_email, // list of receivers (who receives)
    subject: 'New Order Request Received!', // Subject line
    text: 'New Order ', // plaintext body
    html: '<p>Dear '+ supp[0].company_name+'</p><b>You Have a New Order #' + order + ' </b><br><a href="http://localhost:3000/supplierorders?s='+supp[0].id+'">Please review and submit your response.</a>' // html body
  };


  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return "Error sending mail"
      return console.log(error);
    }

  });
  return "success"

};



app.post('/getAlerting', async (req, res) => {

  try {

    let productSql = `
      SELECT 
        * from products where qty_avail < alert_level       
      `;


    //Get header data from db and create object tree
    let products = await runQuery(productSql);
    res.status(200).json(products);
  } catch (e) {
    res.sendStatus(500);
  }
});





app.post('/processOrderApproveCancel', async (req, res) => {
  const {item, appStatus} = req.body;
console.log(appStatus);

  try {
    const orderUpdateStatus = await updateOrderLineItem(item, appStatus);
    res.status(200).json([orderUpdateStatus]);
  } catch (e) {
    console.log("Error updating line item");
    res.orderUpdateStatus(500).json(e)
  }

}
);


const updateOrderLineItem = (item, status) => new Promise((resolve, reject) => {

  let sql = `update order_items set im_approval = ? where id = ?`

  db.query(sql, [status, item], (err, results) => {
    if (err) {
      console.log(err);

      return reject(false)
    } else {
      return resolve("Order Item Updated");
    }
  });
});