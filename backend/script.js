const express = require("express");
const express1 = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const router = express.Router();
const JWT_SECRET = "email@gmail";

express1.use(cors());
express1.use(bodyParser.json());
express1.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

const db_connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "book_Store",
});

db_connection.connect(function (err) {
  debugger;
  if (err) {
    console.log("not connected");
  } else {
    console.log("db connected");
  }
});

express1.put("/update-status/:random_number", (req, res) => {
  console.log("order_status");
  const random_number = req.params.random_number;
  const newStatus = req.body.newStatus;

  console.log(random_number, newStatus);

  let sql = "UPDATE order_table SET order_status = ? WHERE random_number = ?;";

  db_connection.query(sql, [newStatus, random_number], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
    return res.status(200).json({ message: "Status updated successfully" });
  });
});

// sign up login section

express1.post("/signup", function (req, res) {
  const { username, email, password } = req.body;

  // Validate the input data (optional but recommended)
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // bcrypt.genSalt(10, function (err, salt) {
  //   if (err) {
  //     console.error("Error generating salt:", err);
  //     return res.status(400).json({ message: "Password hashing issue" });
  //   }

  //   bcrypt.hash(password, salt, function (err, hash) {
  //     if (err) {
  //       // console.error('Error hashing password:', err);
  //       return res.status(400).json({ message: "Password hashing issue" });
  //     }

  //     let hash_password = hash;
  // console.log('Hashed password:', hash_password);

  // let token = jwt.sign({email:email}, "lolopopopo")
  // res.cookies("token", token)
  // console.log(token, "token")

  // SQL query to insert user data
  let sql = "INSERT INTO users (user_name, email, password) VALUES (?,?,?)";
  db_connection.query(sql, [username, email, password], function (err, result) {
    if (err) {
      // console.error('Error executing query:', err); // Log the error for debugging
      return res.status(500).json({ message: "Server error" });
    }

    // Successful user creation
    res.status(200).json({ message: "User registered successfully" });
  });
});

express1.post("/login", function (req, res) {
  const { email, password } = req.body;
  console.log("Received login request for email:", email);

  const sql1 =
    "SELECT email, password, role, user_id, user_name FROM users WHERE email = ?";
  db_connection.query(sql1, [email], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .send({ status: false, message: "Internal server error" });
    }

    if (result.length === 0) {
      console.log("Email not found in database.");
      return res
        .status(404)
        .send({ status: false, message: "Email not found" });
    }

    const user = result[0];

    if (user.password !== password) {
      console.log("Email not found in database.");
      return res
        .status(401)
        .send({ status: false, message: "invalid password" });
    }

    // If passwords match
    const token = jwt.sign(
      { id: user.user_id, username: user.user_name, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).send({
      status: true,
      message: "User logged in successfully",
      token,
      user: {
        email: user.email,
        username: user.user_name,
        role: user.role,
        id: user.user_id,
      },
    });
  });
});

express1.post("/validate-token", (req, res) => {
  console.log("verify");
  const token = req.headers["authorization"]?.split(" ")[1]; // Get the token from header

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    console.log("verify user/admin");
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    res.status(200).json({ message: "Token is valid", user: decoded });
  });
});

express1.get("/getbooksbyid/:id", function (req, res) {
  let id = req.params.id;
  // console.log(id);
  let sql = "SELECT * FROM product WHERE product_id = ?";
  db_connection.query(sql, [id], function (err, result) {
    if (err) {
      return res.status(500).json({ message: "server error" });
    }

    return res.status(200).send({ status: 200, message: "data", data: result });
  });
});

express1.post("/addtocart", function (req, res) {
  const { title, user_id, book_id, quantity1, price, image, description } =
    req.body;
  console.log(title, user_id, book_id, quantity1, price, image, description);
  const total_amount = price * quantity1;

  let sql =
    "INSERT INTO add_to_cart (user_id,product_id,quantity,price,title,image,total_amount,description) VALUES (?,?,?,?,?,?,?,?)";
  db_connection.query(
    sql,
    [
      user_id,
      book_id,
      quantity1,
      price,
      title,
      image,
      total_amount,
      description,
    ],
    function (err, result) {
      if (err) {
        return res.status(500).json({ message: "server error addtocart", err });
      } else {
        return res.status(200).json({ message: "data inserted", result });
      }
    }
  );
});

express1.get("/getallproduct/:id", function (req, res) {
  const id = req.params.id;
  // console.log(id)
  if (id) {
    let sql = "SELECT * FROM add_to_cart WHERE user_id = ?";
    db_connection.query(sql, [id], function (err, result) {
      // console.log(result)
      if (err) {
        return res.status(500).json({ message: "server error", err });
      }
      if (result.length === 0) {
        // console.log(result.length)
        return res.status(200).send({ message: "data empty", data: [] });
      }
      // console.log(result.length, "cart")
      return res
        .status(200)
        .send({ status: 200, message: "data", data: result });
    });
  }
});

express1.get("/getproductbyid/:id", function (req, res) {
  const id = req.params.id;
  let sql =
    "SELECT COUNT(*) AS total_product FROM add_to_cart WHERE user_id = ?";
  db_connection.query(sql, [id], function (err, result) {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }

    if (result.length > 0) {
      // console.log() //.log(result.length)
      return res.status(200).send({
        status: true,
        message: "User count",
        total_product: result[0].total_product,
      });
    } else {
      return res.status(200).send({
        status: true,
        message: "User count",
        total_product: 0,
      });
    }
  });
});

express1.delete("/deleteCartItem/:id", function (req, res) {
  let id = req.params.id;
  let sql = "DELETE FROM add_to_cart  WHERE cart_id = ?";
  db_connection.query(sql, [id], function (error, result) {
    if (error) {
      return res.status(500).send({ message: "server error" });
    }
    res.status(200).json({ message: "data delete" });
  });
});

express1.post("/add_address/:id", function (req, res) {
  const id = req.params.id;
  const { fullname, contact, pincode, city, state, house_no, road_name } =
    req.body;
  // console.log(fullname,contact,pincode,city,state,house_no,road_name)
  // console.log(fullname,contact,pincode,city,state,house_no,road_name,id)
  let sql =
    "INSERT INTO user_address (user_id , full_name , contact , pincode, city , state , house_no , road_name) VALUES (?,?,?,?,?,?,?,?)";
  db_connection.query(
    sql,
    [id, fullname, contact, pincode, city, state, house_no, road_name],
    function (err, result) {
      // console.log(result)
      if (err) {
        return res.status(500).json({ message: "server error" });
      }
      return res.status(200).json({ message: "inserted address successfully" });
    }
  );
});

express1.get("/getaddress/:id", function (req, res) {
  const id = req.params.id;
  let sql = "SELECT * FROM user_address WHERE user_id = ?";
  db_connection.query(sql, [id], function (err, result) {
    console.log(result);
    if (err) {
      return res.status(500).json({ message: "server error" });
    }
    return res
      .status(200)
      .json({ message: "user address is exist", data: result });
  });
});

express1.get("/api/data", (req, res) => {
  const page = parseInt(req.query.page) || 1; // Current page, default to 1
  const pageSize = parseInt(req.query.page_size) || 10; // Number of records per page, default to 10

  const offset = (page - 1) * pageSize; // For Page 1, offset will be 0; for Page 2, it will be 10; and so on.

  // Query to get the data for the current page
  const dataQuery = `SELECT p.*, c.category_name 
                     FROM product p
                     INNER JOIN category c ON p.category_id = c.category_id
                     WHERE p.is_deleted = FALSE 
                     LIMIT ${pageSize} OFFSET ${offset}`;

  // Query to get the total number of records (this is needed for pagination)
  const countQuery = `SELECT COUNT(*) AS totalRecords FROM product`;

  // Execute the data query
  db_connection.query(dataQuery, (err, results) => {
    if (err) {
      res.status(500).send("Error fetching data");
      return;
    }

    // Execute the count query to get total number of records
    db_connection.query(countQuery, (err, countResults) => {
      if (err) {
        res.status(500).send("Error fetching total records count");
        return;
      }

      // Respond with the paginated data and total records
      const totalRecords = countResults[0].totalRecords;

      return res.json({
        data: results, // The current page data
        totalRecords: totalRecords, // Total number of records in the database (dynamic)
        totalPages: Math.ceil(totalRecords / pageSize), // Total pages based on the total records and page size
        currentPage: page, // Current page number
      });
    });
  });
});

//===== admin side code here ======//

express1.get("/SearchCategory", (req, res) => {
  console.log("search category");
  const keyword = req.query.keyword;
  const sqlQuery = "SELECT * FROM category WHERE category_name LIKE ?";
  const values = [`%${keyword}%`];

  db_connection.query(sqlQuery, values, (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Search failed" });
    }
    res.json({ category: results });
  });
});

express1.post("/add-books", upload.single("image"), function (req, res) {
  console.log("add_book route access");
  const {
    title,
    author,
    description,
    price,
    category_id,
    offer_price,
    discount_type,
    discount_value,
    stock,
    date,
  } = req.body;

  // const imagePath = req.file ? req.file.path : null;
  const imagePath = req.file ? "uploads/" + req.file.originalname : null;
  const image = imagePath.split("/").pop();

  console.log(
    "title",
    title,
    "author",
    author,
    "description",
    description,
    "price",
    price,
    "imagePath",
    imagePath,
    "category_id",
    category_id,
    " offer_price",
    offer_price,
    "discount_type",
    discount_type,
    "discount_value",
    discount_value,
    "stock",
    stock,
    "date",
    date
  );

  if (!imagePath) {
    return res.status(400).json({ message: "Image file is required" });
  }

  let sql =
    "INSERT INTO product (title, author, description, price, image, category_id, offer_price, discount_type, discount_value, stock_quantity, publication_date	) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)";

  db_connection.query(
    sql,
    [
      title,
      author,
      description,
      price,
      image,
      category_id,
      offer_price,
      discount_type,
      discount_value,
      stock,
      date,
    ],

    function (err, result) {
      if (err) {
        return res.status(500).json({ message: "Server error" });
      }
      res.status(200).json({ message: "Book added successfully" });
    }
  );
});

express1.get("/SearchProduct", (req, res) => {
  console.log("search product");
  const title = req.query.keyword;
  const sqlQuery = "SELECT * FROM product WHERE title LIKE ?";
  const values = [`%${title}%`];

  db_connection.query(sqlQuery, values, (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Search failed" });
    }
    return res.json({ product: results });
  });
});

express1.get("/getalluser", function (req, res) {
  let sql = "SELECT COUNT(*) AS totalUsers FROM users";
  db_connection.query(sql, function (err, result) {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }

    if (result.length > 0) {
      // console.log(result.length)
      return res.status(200).send({
        status: true,
        message: "User count",
        totalUsers: result[0].totalUsers,
      });
    } else {
      return res.status(200).send({
        status: true,
        message: "User count",
        totalUsers: 0,
      });
    }
  });
});

express1.get("/getallbook", function (req, res) {
  console.log("hii");
  let sql = "SELECT COUNT(*) AS totalBooks FROM product where is_deleted = 0";
  db_connection.query(sql, function (err, result) {
    if (err) {
      res.status(500).json({ message: "server error" });
    }
    if (result.length > 0) {
      return res.status(200).send({
        status: true,
        message: "data length",
        totalBooks: result[0].totalBooks,
      });
    } else {
      return res
        .status(200)
        .send({ status: true, message: "data length is 0", totalBooks: 0 });
    }
  });
});

express1.get("/CountAllOrder", function (req, res) {
  let sql = "SELECT COUNT(*) AS totalOrder FROM order_table";
  db_connection.query(sql, function (err, result) {
    if (err) {
      res.status(500).json({ message: "server error" });
    }
    if (result.length > 0) {
      return res.status(200).send({
        status: true,
        message: "data length",
        totalOrder: result[0].totalOrder,
      });
    } else {
      return res
        .status(200)
        .send({ status: true, message: "data length is 0", totalOrder: 0 });
    }
  });
});

express1.get("/CountAllOrderItems", function (req, res) {
  let sql = "SELECT COUNT(*) AS totalOrderItems FROM order_items";
  db_connection.query(sql, function (err, result) {
    if (err) {
      res.status(500).json({ message: "server error" });
    }
    if (result.length > 0) {
      return res.status(200).send({
        status: true,
        message: "data length",
        totalOrderItems: result[0].totalOrderItems,
      });
    } else {
      return res.status(200).send({
        status: true,
        message: "data length is 0",
        totalOrderItems: 0,
      });
    }
  });
});

express1.get("/getCategoryCount", function (req, res) {
  console.log("category count");
  let sql =
    "SELECT COUNT(*) AS totalCategory FROM category where is_deleted = 0";
  db_connection.query(sql, function (err, result) {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }

    if (result.length > 0) {
      return res.status(200).send({
        status: true,
        message: "User count",
        totalCategory: result[0].totalCategory,
      });
    } else {
      return res.status(200).send({
        status: true,
        message: "User count",
        totalCategory: 0,
      });
    }
  });
});

express1.use("/uploads", express.static(path.join(__dirname, "uploads")));
express1.get("/getbooks", function (req, res) {
  let sql = "SELECT * FROM product";
  db_connection.query(sql, function (err, result) {
    if (err) {
      // console.log(err)
      return res.status(500).json({ message: "server error" });
    } else {
      return res.status(200).send({ message: "data", data: result });
    }
  });
});

express1.post("/contact", (req, res) => {
  const { email, contact, message } = req.body;

  const sql = "INSERT INTO contact (email, contact, message) VALUES (?, ?, ?)";
  db_connection.query(sql, [email, contact, message], (err, result) => {
    if (err) {
      console.error("Error inserting contact data:", err);
      return res.status(500).json({ error: "Database error" });
    }
    return res
      .status(200)
      .json({ message: "Contact details submitted successfully" });
  });
});

express1.get("/countAllcontact", function (req, res) {
  let sql = "SELECT COUNT(*) AS totalContact FROM contact";
  db_connection.query(sql, function (err, result) {
    if (err) {
      res.status(500).json({ message: "server error" });
    } else {
      if (result.length > 0) {
        return res.send({
          status: 200,
          message: "total count",
          totalContact: result[0].totalContact,
        });
      }
    }
  });
});

express1.get("/getallbookinadminpanel", function (req, res) {
  console.log("getAllProduct");
  let sql = "select * from product where is_deleted = 0";
  db_connection.query(sql, function (err, result) {
    if (err) {
      res.status(500).send({ message: "server error" });
    } else {
      return res.status(200).send({ message: "data receive", data: result });
    }
  });
});

express1.post("/contact", function (req, res) {
  const [email, contact, message] = req.body;
  console.log("contact 1");
  let sql = "insert into contact(email,contact,message) values (?,?,?)";
  db_connection.query(sql, [email, contact, message], function (error, result) {
    if (error) {
      console.log("contact 2");
      return res.status(500).json({ message: "server error" });
    }
    console.log("contact success");
    return res.status(200).json({ message: "insert successfully" });
  });
});

express1.delete("/deleteContact/:id", function (req, res) {
  let id = req.params.id;
  // console.log(id,"delete")
  let sql = "DELETE FROM contact WHERE contact_id = ?";
  db_connection.query(sql, [id], function (err, result) {
    // console.log(result)
    if (err) return res.status(500).send({ message: "server error" });
    return res.status(200).send({ message: "delete", data: result });
  });
});

express1.get("/getAllContact", function (req, res) {
  let sql = "select * from contact";
  db_connection.query(sql, function (err, result) {
    if (err) {
      res.status(500).json({ message: "server error" });
    }
    res
      .status(200)
      .json({ message: "data receive successfully", ContactData: result });
  });
});

express1.delete("/deletebookinadminpanel/:id", function (req, res) {
  let id = req.params.id;
  let sql = "DELETE FROM add_books WHERE id = ?";
  db_connection.query(sql, [id], function (err, result) {
    if (err) {
      return res.status(500).send({ message: "server error" });
    } else {
      return res.status(200).send({ message: "deta delete" });
    }
  });
});

express1.get("/getbookbyid/:id", function (req, res) {
  let id = req.params.id;
  let sql = "SELECT * FROM product WHERE product_id = ?";
  db_connection.query(sql, [id], function (err, result) {
    if (err) {
      return res.status(500).send({ message: "server error" });
    } else {
      return res.status(200).send({ status: 200, data: result[0] });
    }
  });
});

express1.get("/getCategoryById/:id", function (req, res) {
  let id = req.params.id;
  let sql = "SELECT * FROM category WHERE category_id = ?";
  db_connection.query(sql, [id], function (err, result) {
    if (err) {
      return res.status(500).send({ message: "server error" });
    } else {
      return res.status(200).send({ status: 200, categoryData: result[0] });
    }
  });
});

express1.get("/applyCategory/:id", function (req, res) {
  let categoryId = req.params.id;
  console.log("applycategory", categoryId);
  let sql = `SELECT p.*, c.category_name
             FROM product p
             JOIN category c ON p.category_id = c.category_id
             WHERE p.category_id = ? 
             AND p.is_deleted = 0 
             AND c.is_deleted = 0;`;
  db_connection.query(sql, [categoryId], function (err, result) {
    if (err) {
      return res.status(500).send({ message: "server error" });
    } else {
      return res.status(200).send({ status: 200, filterCategory: result });
    }
  });
});

//update book by id
express1.put("/update_books/:id", upload.single("image"), (req, res) => {
  const bookId = req.params.id;

  db_connection.query(
    "SELECT image FROM product WHERE product_id = ?",
    [bookId],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });

      if (results.length === 0) {
        return res.status(404).json({ message: "Book not found" });
      }

      const oldBook = results[0];
      const imagePath = req.file ? req.file.filename : oldBook.image;

      const {
        title,
        author,
        description,
        price,
        category_id,
        offer_price,
        discount_type,
        discount_value,
        stock,
        date,
      } = req.body;

      const sqlUpdate = `UPDATE product SET title=?, author=?, description=?, price=?, image=?, category_id=?, offer_price=?, discount_type=?, discount_value=?, stock_quantity=?, publication_date=? WHERE product_id=?`;

      db_connection.query(
        sqlUpdate,
        [
          title,
          author,
          description,
          price,
          imagePath,
          category_id,
          offer_price,
          discount_type,
          discount_value,
          stock,
          date,
          bookId,
        ],
        (err2, result2) => {
          if (err2) return res.status(500).json({ error: "Update failed" });

          res.json({ message: "Book updated successfully" });
        }
      );
    }
  );
});

express1.post("/confirm_order", (req, res) => {
  const { address_id, user_id, total_item, total_amount } = req.body;
  // console.log("confirm order data",  address_id, user_id, total_item, total_amount);

  const sql =
    "INSERT INTO order_table (address_id, user_id, total_item, total_pay) VALUES (?, ?, ?, ?)";

  let query1 = db_connection.query(
    sql,
    [address_id, user_id, total_item, total_amount],
    (err, result) => {
      if (err) {
        // console.log(query1, err)
        return res
          .status(500)
          .json({ error: "Failed to insert into order table" });
      }

      const order_id = result.insertId;
      // console.log(order_id)
      return res
        .status(200)
        .send({ message: "Order confirmed successfully", order_id });
    }
  );
});

// Order item route
express1.post("/order_item/:order_id", (req, res) => {
  const order_id = req.params.order_id;
  const orderItems = req.body;
  // console.log(order_id,orderItems)
  const sql =
    "INSERT INTO order_items (order_id, product_id, price,quantity, total_amount) VALUES ?";

  const price = orderItems.map((item) => [item.price]);
  const quantity = orderItems.map((item) => [item.quantity]);
  const total_amount = price * quantity;
  console.log(price, quantity, total_amount);
  const orderItemsData = orderItems.map((item) => [
    order_id,
    item.product_id,
    item.price,
    item.quantity,
    item.price * item.quantity,
  ]);

  console.log(orderItemsData);

  db_connection.query(sql, [orderItemsData], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Failed to insert into order_items table" });
    }
    return res.status(200).json({ message: "Order items added successfully" });
  });
});

express1.get("/getCartOrder/:id", function (req, res) {
  let id = req.params.id;
  // console.log(id, "user_id")
  let sql = "SELECT * FROM my_order WHERE user_id = ?";
  db_connection.query(sql, [id], function (err, result) {
    // console.log(result)
    if (err) return res.status(500).send({ message: "server error" });

    console.log(result);
    return res.status(200).send({ message: "get order", data: result });
  });
});

express1.delete("/deleteAllCartData/:id", function (req, res) {
  let id = req.params.id;
  // console.log(id,"delete")
  let sql = "DELETE FROM add_to_cart WHERE user_id = ?";
  db_connection.query(sql, [id], function (err, result) {
    // console.log(result)
    if (err) return res.status(500).send({ message: "server error" });
    return res.status(200).send({ message: "get order", data: result });
  });
});

express1.get("/AllOrder", function (req, res) {
  let sql = `SELECT o.*, u.user_name
  FROM order_table AS o
  JOIN users AS u 
  ON o.user_id = u.user_id`;
  db_connection.query(sql, function (err, result) {
    if (err) {
      return res.status(500).json({ message: "server error" });
    }
    return res
      .status(200)
      .send({ status: 200, message: "order show data", orderData: result });
  });
});

express1.get("/AllOrderItem", function (req, res) {
  let sql = "SELECT * FROM order_items";
  db_connection.query(sql, function (err, result) {
    if (err) {
      // console.log(err)
      return res.status(500).json({ message: "server error" });
    }
    // console.log(result)
    return res.status(200).send({
      status: 200,
      message: "order show data",
      orderItemsData: result,
    });
  });
});

express1.put("/update-status", function (req, res) {
  console.log("upadte status");
  const { order_id, status } = req.body;
  console.log(order_id, status);
  let sql1 = "UPDATE order_table SET status = ? WHERE order_id = ?";
  console.log(sql1);
  db_connection.query(sql1, [status, order_id], function (err, result) {
    console.log(result, status, order_id);
    if (err) {
      return res.status(500).json({ message: "server error" });
    }
    res.status(200).send({ message: "status update successfully" });
  });
});

express1.get("/getCartOrderbyOrderId/:user_id", function (req, res) {
  const { user_id } = req.params;
  // console.log(user_id)
  let sql = "select * from  order_table  where user_id = ?";
  // console.log(sql)
  db_connection.query(sql, [user_id], function (err, result) {
    if (err) {
      // console.log(err)
      return res.status(500).json({ message: "server error" });
    }
    res
      .status(200)
      .send({ status: 200, message: "order show data", getData: result });
  });
});

//Get all users From Database//

express1.get("/users", function (req, res) {
  // console.log("user1")
  let sql = "SELECT * FROM users";
  // console.log("user2", sql)

  db_connection.query(sql, function (error, result) {
    if (error) {
      //  console.log("user3 user error",)
      return res.status(500).json({ message: "server error" });
    } else {
      // console.log("result")
      return res.status(200).send({ message: "data", users: result });
    }
  });
});

express1.delete("/users_Delete/:id", function (req, res) {
  const { id } = req.params; // Correctly extracting 'id' from URL parameters
  // console.log(id, "iddddddddddddddd");

  let sql = "DELETE FROM users WHERE user_id = ?"; // Correct SQL query

  db_connection.query(sql, [id], function (err, result) {
    if (err) {
      // console.error(err);
      return res.status(500).json({ message: "Error deleting user" });
    }

    res.status(200).json({ message: "User deleted successfully", result });
  });
});

express1.delete("/deleteProducts/:id", function (req, res) {
  const { id } = req.params;

  let sql = `update product set is_deleted = TRUE where product_id = ?`;

  db_connection.query(sql, [id], function (err, result) {
    if (err) {
      return res.status(500).json({ message: "Error deleting user" });
    }

    res.status(200).json({ message: "book deleted successfully", result });
  });
});

express1.post("/companyInfo", (req, res) => {
  const { email, email2, contact, contact2, address } = req.body;
  console.log(email, email2, contact, contact2, address);
  let sql =
    "INSERT INTO company_info (email,email2,contact,contact2,address) VALUES (?,?,?,?,?)";
  db_connection.query(
    sql,
    [email, email2, contact, contact2, address],
    function (error, result) {
      if (error) {
        return res.status(500).json({ message: "server error" });
      }
      return res.status(200).json({ message: "sccessfully add" });
    }
  );
});

express1.get("/getcompanyInfo", function (req, res) {
  // console.log("Fetching company count...");

  // SQL query to get the company count
  let sql = "SELECT COUNT(*) AS companyInfo FROM company_info";

  // Execute the query
  db_connection.query(sql, function (err, result) {
    if (err) {
      console.error("Database error:", err); // Log the error for better debugging
      return res.status(500).json({ error: "Database error", details: err });
    }

    // Since result should have exactly one row with the company count, return the count
    const companyCount = result[0] ? result[0].companyInfo : 0; // Default to 0 if no result

    return res.status(200).send({
      status: true,
      message: "Company count fetched successfully", // More accurate message
      companyInfo: companyCount,
    });
  });
});

express1.get("/getAllCompanyInfo", (req, res) => {
  let sql = "select * FROM company_info";
  db_connection.query(sql, function (err, result) {
    if (err) {
      return res.status(500).send("Error fetching company info");
    }
    return res
      .status(200)
      .json({ message: "company data", companyData: result });
  });
});

express1.put("/updateComponyInfo/:id", (req, res) => {
  const { email, email2, contact, contact2, address } = req.body;
  const id = req.params.id;
  console.log(id, email, email2, contact, contact2, address);

  let sql =
    "UPDATE company_info SET email = ?, email2 = ?, contact = ?, contact2 = ?, address = ? WHERE id = ?";
  db_connection.query(
    sql,
    [email, email2, contact, contact2, address, id],
    function (error, result) {
      if (error) {
        console.error("Error updating company details:", err);
        res.status(500).json({ message: "Database error" });
      } else {
        res
          .status(200)
          .json({ message: "Company details updated successfully" });
      }
    }
  );
});

express1.delete("/deleteCompanyInfo/:id", function (req, res) {
  let id = req.params.id;
  // console.log(id,"delete")
  let sql = "DELETE FROM company_info WHERE id = ?";
  db_connection.query(sql, [id], function (err, result) {
    // console.log(result)
    if (err) return res.status(500).send({ message: "server error" });
    return res.status(200).send({ message: "delete", data: result });
  });
});

express1.get("/getCompanyInfoById/:id", function (req, res) {
  let id = req.params.id;
  console.log(id, "com id");
  let sql = "SELECT * FROM company_info WHERE id = ?";
  db_connection.query(sql, [id], function (err, result) {
    // console.log(result)
    if (err) return res.status(500).send({ message: "server error" });

    console.log(result);
    return res.status(200).send({ message: "get order", data: result });
  });
});

express1.get("/getcompanyInfo", function (req, res) {
  console.log("get compny count");
  let sql = "SELECT COUNT(*) AS companyInfo FROM company_info";
  console.log("get company count2");
  db_connection.query(sql, function (err, result) {
    console.log(sql);
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }

    if (result.length > 0) {
      // console.log(result.length)
      return res.status(200).send({
        status: true,
        message: "User count",
        companyInfo: result[0].companyInfo,
      });
    } else {
      return res.status(200).send({
        status: true,
        message: "User count",
        companyInfo: 0,
      });
    }
  });
});

express1.get("/items/:id", function (req, res) {
  const id = req.params.id;
  let sql1 = `SELECT
  o.order_id,
  o.random_number,
  o.total_item,
  oi.total_amount,
  oi.product_id,
  oi.price AS item_price,
  oi.quantity,
  p.title AS product_title,
  p.author,
  p.price,
  p.image,
  a.full_name,
  a.contact,
  a.house_no,
  a.road_name,
  a.city,
  a.pincode,
  a.state
    
FROM
  order_table AS o  
JOIN
  order_items AS oi ON o.order_id = oi.order_id  
JOIN
  product AS p ON oi.product_id = p.product_id
JOIN
  user_address AS a ON o.address_id = A.address_id

WHERE
  o.order_id = ?`;

  //  console.log(sql)
  db_connection.query(sql1, [id], function (err, result) {
    console.log(result);
    // console.log(result)
    if (err) {
      res.status(500).json({ message: "server error" });
    }

    res.status(200).send({ message: "items", items: result });
  });
});

express1.get("/getUserItems/:user_id", function (req, res) {
  const user_id = req.params.user_id;
  console.log("getitembyuserid", user_id);
  let sql = `SELECT o.order_id,
      p.product_id, p.title, p.image,p.price,p.description,p.author, oi.quantity,
      o.total_item,oi.total_amount,o.random_number, o.estimate_date, o.delivery_date, o.order_status,o.total_pay,
      a.full_name,
      a.contact,
      a.house_no,
      a.road_name,
      a.city,
      a.pincode,
      a.state
    FROM order_table o
    JOIN users u ON o.user_id = u.user_id
    JOIN order_items oi ON o.order_id = oi.order_id
    JOIN product p ON oi.product_id = p.product_id
    JOIN user_address a ON o.address_id = a.address_id WHERE o.user_id = ?`;

  db_connection.query(sql, [user_id], function (err, result) {
    if (err) {
      return res.status(500).send({ message: "server error" });
    }
    return res.status(200).send({ message: "data", UserItems: result });
  });
});

express1.post("/update-profile", upload.single("profilePic"), (req, res) => {
  console.log("use_profile");


  const userId = req.body.userId; // Get userId from form-data
   const profileImage = req.file ? "uploads/" + req.file.originalname : null;
  const image = profileImage.split("/").pop();

  // console.log(userId, image);

  if (!userId || !image) {
    return res.status(400).json({ message: "User ID and Image are required" });
  }

  const query = "UPDATE users SET profile_image = ? WHERE user_id = ?";
  db_connection.query(query, [image, userId], (err, result) => {
    console.log(result);
    if (err) return res.status(500).json({ error: err.message });
    return res.json({ message: "✅ Profile Updated!", imageUrl: profileImage });
  });
});

express1.get("/getOderDetail/:order_id", function (req, res) {
  const order_id = req.params.order_id;

  console.log(order_id, "order_id");
  let sql = `SELECT o.order_id,
      p.product_id, p.title, p.image,p.price,p.description,p.author, oi.quantity,
      o.total_item,oi.total_amount,o.random_number,o.order_status,
      o.total_pay,
      a.full_name,
      a.contact,
      a.house_no,
      a.road_name,
      a.city,
      a.pincode,
      a.state
    FROM order_table o
    JOIN users u ON o.user_id = u.user_id
    JOIN order_items oi ON o.order_id = oi.order_id
    JOIN product p ON oi.product_id = p.product_id
    JOIN user_address a ON o.address_id = a.address_id
    WHERE o.random_number = ?`;
  db_connection.query(sql, [order_id], function (err, result) {
    if (err) {
      return res.status(500).send({ message: "server error" });
    }
    return res.status(200).send({ message: "data", UserItems: result });
  });
});

express1.post("/category", upload.single("image"), function (req, res) {
  const { category_name, category_description } = req.body;
  console.log(category_description);

  const imagePath = req.file ? "uploads/" + req.file.originalname : null;
  const image = imagePath.split("/").pop();

  if (!image) {
    return res.status(400).json({ message: "Image file is required" });
  }

  let sql =
    "INSERT INTO category (category_name, description, image) VALUES (?, ?, ?)";
  db_connection.query(
    sql,
    [category_name, category_description, image],
    function (err, result) {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({ message: "Server error" });
      }
      return res.status(200).json({ message: "Book added successfully" });
    }
  );
});

// inside category.routes.js

express1.get("/getcategory/", function (req, res) {
  // Corrected the parameter order
  let sql = `SELECT category_id, category_name 
             FROM category where is_deleted = 0`;

  db_connection.query(sql, function (err, result) {
    if (err) {
      return res.status(500).send({ message: "server error" });
    }
    return res.status(200).send({ message: "data", categoryData: result });
  });
});

express1.get("/getallcategory", function (req, res) {
  let sql = "select * from category where is_deleted = 0";

  db_connection.query(sql, function (error, result) {
    if (error) {
      return res.status(500).json({ message: "server error" });
    } else {
      return res.status(200).send({ message: "data", category: result });
    }
  });
});

express1.delete("/deleteCategory/:id", (req, res) => {
  const categoryId = req.params.id;
  console.log(categoryId, "categoryId");

  const checkPurchaseSql = `
    SELECT COUNT(*) AS purchase_count
    FROM order_items
    WHERE product_id IN (
      SELECT product_id FROM Product WHERE category_id = ?
    )
  `;

  db_connection.query(checkPurchaseSql, [categoryId], (err, result) => {
    if (err) {
      console.error("Error checking purchase history:", err);
      return res.status(500).send({ message: "Server error" });
    }

    const purchaseCount = result[0].purchase_count;

    if (purchaseCount > 0) {
      const softDeleteCategory = `UPDATE Category SET is_deleted = 1 WHERE category_id = ?`;
      const softDeleteProduct = `UPDATE Product SET is_deleted = 1 WHERE category_id = ?`;

      db_connection.query(softDeleteCategory, [categoryId], (err1) => {
        if (err1)
          return res
            .status(500)
            .send({ message: "Error soft deleting category" });

        db_connection.query(softDeleteProduct, [categoryId], (err2) => {
          if (err2)
            return res
              .status(500)
              .send({ message: "Error soft deleting product" });

          return res
            .status(200)
            .send({ message: "Soft deleted (category & products)" });
        });
      });
    } else {
      const deleteProductSql = `DELETE FROM Product WHERE category_id = ?`;
      const deleteCategorySql = `DELETE FROM Category WHERE category_id = ?`;

      db_connection.query(deleteProductSql, [categoryId], (err1) => {
        if (err1)
          return res.status(500).send({ message: "Error deleting product" });

        db_connection.query(deleteCategorySql, [categoryId], (err2, result) => {
          if (err2)
            return res.status(500).send({ message: "Error deleting category" });

          return res
            .status(200)
            .send({ message: "Category and products deleted" });
        });
      });
    }
  });
});

express1.put("/updateCategory/:id", upload.single("image"), (req, res) => {
  console.log("update category");
  const { category_name, category_description } = req.body;
  const category_id = req.params.id;
  console.log(
    "category_name => ",
    category_name,
    "category_description =>",
    category_description
  );

  // let image = req.file ? req.file.path : null;

  db_connection.query(
    "SELECT image FROM category WHERE category_id = ?",
    [category_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });

      if (results.length === 0) {
        return res.status(404).json({ message: "Book not found" });
      }

      const oldBook = results[0];
      const imagePath = req.file ? req.file.filename : oldBook.image;

      // console.log(image);
      const sql = `UPDATE category SET category_name=?, description=?, image=?  WHERE category_id=?`;
      // console.log(sql);
      db_connection.query(
        sql,
        [category_name, category_description, imagePath, category_id],
        (err, result) => {
          if (err) {
            console.error("Error updating book:", err);
            return res.status(500).json({ error: "Database error" });
          }
          res.json({ message: "Book updated successfully", data: result });
        }
      );
    }
  );
});

express1.get("/getallproduct", function (req, res) {
  let sql = "SELECT * FROM product";

  db_connection.query(sql, function (error, result) {
    if (error) {
      //  console.log("user3 user error",)
      return res.status(500).json({ message: "server error" });
    } else {
      // console.log("result")
      return res.status(200).send({ message: "data", product: result });
    }
  });
});

express1.get("/getimage/:id", function (req, res) {
  const userId = req.params.id;
  // console.log(userId,"image")
  // console.log("user1")
  let sql = "SELECT profile_image FROM users where user_id = ?";
  // console.log("user2", sql)

  db_connection.query(sql, [userId], function (error, result) {
    // console.log(result)
    if (error) {
      //  console.log("user3 user error",)
      return res.status(500).json({ message: "server error" });
    } else {
      // console.log("result")
      return res.status(200).send({ message: "data", userData: result });
    }
  });
});

express1.post("/filter", function (req, res) {
  const { role, status, search } = req.body;

  let sql = `SELECT * FROM users WHERE 
             (role = ? OR ? IS NULL) 
             AND (user_name LIKE CONCAT('%', ?, '%') OR ? IS NULL)`;

  db_connection.query(
    sql,
    [role, role, search, search],
    function (err, result) {
      if (err) {
        return res.status(500).json({ message: "Server error" });
      }
      return res.status(200).json({ message: "Filtered Data", filter: result });
    }
  );
});

express1.use(
  cors({
    origin: "http://localhost:4200", // Angular frontend
    methods: ["GET", "POST", "DELETE", "PUT"], // Allow methods, including DELETE
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

express1.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

// create database Book_Store;
// create table users (user_id int auto_increment primary key, user_name varchar(100),email varchar(100) unique, password varchar(20));
// create table product(product_id int auto_increment primary key, title varchar(100), author varchar(100) not null, description varchar(100),price int(10),image varchar(255))
// create table add_to_cart(cart_id int primary key  key auto increment ,user_id int not null,product_id int not nul,quantity int not null,price int(10),title varchar(100),image varchar(255),total_amount int (10),description varchar(100),
// constraints fk_addCart_userId foreign key(user_id) refrences users(user_id),constraints fk_addCart_productId foreign key key(product_id) refrences product(product_id))
// create table order_table(order_id int auto_increment primary key,address_id int not null, user_id int not null, total_item int(10), total_amount int(10),
//  constraint fk_userAddress_orderTable FOREIGN KEY (address_id) references user_address(address_id));
// create table order_items(order_items_id int not null auto increment,order_id int not null,product_id int not null,price int not null(10),quantity int not null,total_amount int not null, constrant fk_productId_orderItems foreign key (product_id) refrences product(product_id),
// constrant fk_OrderId_orderItems foreign key (order_id) refrences order_table(order_id))

//create table user_profile(profile_id int primary key auto increment, user_id int not null, profile_image varchar(255) not null,
// constrant fk_userId_userProfile foreign key (user_id) refrences users(user_id) )

//create table user_address(address_id int not null auto_increment primary key, user_id int not null, full_name varchar(100), contact int(10), pincode int(10), city varchar(100), state varchar(100), house_no varchar(10), road_name varchar(100), constraint fk_userId_userAddress foreign key (user_id) references users(user_id));

// express1.post("/uploadProfileImage", uploads.single("image"), (req, res) => {
//   const { user_id } = req.body;
//   const imagePath = req.file ? req.file.path : null;
//   // console.log(user_id,imagePath)
//   // Save the image path to the UserProfile table
//   const sql = "INSERT INTO user_profile (user_id, profile_image) VALUES (?, ?)";
//   db_connection.query(sql, [user_id, imagePath], (err, result) => {
//     // console.log(sql,result,user_id,imagePath)
//     if (err) {
//       return res.status(500).send("Error saving profile image");
//     }
//     res
//       .status(200)
//       .send({
//         message: "Profile image uploaded successfully",
//         imagePath: imagePath,
//       });
//   });
// });
