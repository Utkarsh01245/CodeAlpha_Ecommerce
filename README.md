# 🛒 Simple E-Commerce Store

A basic **full-stack e-commerce web application** built as part of the **CodeAlpha Internship (Task 1)**.

This project demonstrates product listings, shopping cart functionality, order processing, and user authentication with a clean and scalable architecture.

---

## 📌 Features

### 🛍️ Product Listings

* Browse available products with images, descriptions, and pricing.
* Dynamic product rendering from the database.

### 🛒 Shopping Cart

* Add products to the cart.
* Remove products from the cart.
* View cart summary and total amount.

### 📄 Product Details Page

* View complete information about individual products.
* Display pricing, description, and product specifications.

### 🔐 User Authentication

* User Registration
* User Login
* Secure password hashing and storage
* Session/JWT-based authentication

### 📦 Order Processing

* Checkout functionality
* Place and manage orders
* Store order history in the database

### 💾 Database Integration

* Persistent storage for:

  * Users
  * Products
  * Orders

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript (ES6)

### Backend

* Express.js (Node.js) **or**
* Django (Python)

### Database

* MongoDB
* PostgreSQL
* MySQL

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/CodeAlpha_Ecommerce.git
cd CodeAlpha_Ecommerce
```

---

### 2️⃣ Backend Setup (Node.js Example)

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

Create a `.env` file in the root directory and configure the following variables:

```env
MONGO_URI=your_database_url
JWT_SECRET=your_secret_key
PORT=5000
```

---

### 3️⃣ Frontend Setup

Open the frontend directly in your browser:

```bash
frontend/index.html
```

Or serve it using a simple HTTP server:

```bash
npx serve
```

---

## 📂 Project Structure

```text
CodeAlpha_Ecommerce/
│
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   └── orders.js
│   │
│   └── server.js
│
├── frontend/
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   └── assets/
│
├── .env
├── package.json
└── README.md
```

---

## 🚀 Usage

1. Register a new account or log in.
2. Browse available products.
3. Add products to your shopping cart.
4. Review your cart summary.
5. Proceed to checkout.
6. Place an order.
7. View order history from the database.

---

## 📡 API Endpoints

### 🔐 Authentication

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user          |

---

### 🛍️ Products

| Method | Endpoint            | Description         |
| ------ | ------------------- | ------------------- |
| GET    | `/api/products`     | Get all products    |
| GET    | `/api/products/:id` | Get product details |

---

### 📦 Orders

| Method | Endpoint              | Description       |
| ------ | --------------------- | ----------------- |
| POST   | `/api/orders`         | Place a new order |
| GET    | `/api/orders/:userId` | Get user's orders |

---

## 🔒 Security Features

* Password Hashing
* JWT Authentication
* Protected Routes
* Environment Variables for Sensitive Data
* Input Validation

---

## 🎯 Learning Outcomes

Through this project, the following concepts were implemented:

* Full-Stack Web Development
* RESTful API Design
* User Authentication & Authorization
* Database Management
* CRUD Operations
* Shopping Cart Logic
* Order Management System

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork the repository and submit a pull request.

---

## 📄 License

This project was developed for educational purposes as part of the **CodeAlpha Internship Program**.

---

### ⭐ If you found this project useful, don't forget to give it a star on GitHub!
