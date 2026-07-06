# 🛒 MERN Stack E-Commerce Store

An enterprise-level, full-stack E-Commerce web application built using the **MERN** (MongoDB, Express.js, React, Node.js) architecture. This project implements advanced state management, secure authentication, role-based authorization, and robust CRUD operations.

## 🚀 Live Demo
Experience the live application here: **[Live Demo Link](https://ecommerce-app-mejbha.vercel.app/)**

---

## 🛠️ Tech Stack & Architecture

### Frontend
* **React.js** (Functional Components, Hooks)
* **Redux Toolkit (RTK)** & **RTK Query** (Advanced global state management, automated caching, and data fetching)
* **Tailwind CSS** (Modern, responsive utility-first UI design)
* **React Router Dom** (Client-side routing with route guarding)

### Backend
* **Node.js** & **Express.js** (Modular architecture with MVC pattern)
* **MongoDB** & **Mongoose** (Database modeling and aggregation)
* **JSON Web Tokens (JWT)** (Secure authentication via **HTTP-Only Cookies**)
* **Bcrypt.js** (Password hashing and encryption security)

---

## ✨ Features

### 🔐 Authentication & Security
* **Secure Sign Up & Login:** Fully integrated user authentication.
* **Password Hashing:** Passwords are fully encrypted using `bcryptjs` before database insertion.
* **HTTP-Only Cookies:** JWT tokens are securely stored in the browser's HTTP-Only cookies to protect against XSS attacks.
* **Robust Error Handling:** Features a centralized, custom global error middleware utilizing an asynchronous handler mechanism (`asyncHandler`).

### 🛡️ Role-Based Authorization
* **User Role:** Access to personal profile management, order history, and product browsing.
* **Admin Role:** Access to a dedicated **Admin Dashboard** with specialized privileges to manage users, products, categories, and orders.
* **Route Guarding:** Protected and restricted application routes implemented via React Router components on the frontend and custom authorization middleware on the backend.

### 📦 Product & Order Management
* Complete CRUD operations for products, categories, and user management.
* Advanced state tracking and real-time updates across the app utilizing RTK Query hooks.

---

## 📁 Project Structure

```text
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Controller logic (User, Product, Category, Order)
│   ├── middlewares/     # Authentication & global error middlewares
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API endpoints mappings
│   └── utils/           # Utility functions (Token generation)
│
└── frontend/
    ├── src/
    │   ├── api/         # Axios/Fetch setups
    │   ├── components/  # Reusable UI parts (Header, Sidebar, Modals)
    │   ├── pages/       # Core view screens (Auth, Admin, Products, User Profile)
    │   └── redux/       # Global store config & RTK Query slices