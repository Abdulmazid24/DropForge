# 🚀 DropForge - Enterprise Dropshipping Platform

> A modern, production-ready dropshipping management system built with the MERN stack, featuring real-time order tracking, supplier integration, and role-based access control.

[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Screenshots](#-screenshots)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🎯 Core Functionality
- **User Management** - Multi-role authentication system (Super Admin, Admin, Supplier, Customer)
- **Product Sync** - Automated product synchronization with supplier APIs (cron-based)
- **Order Management** - End-to-end order lifecycle tracking with status updates
- **Profit Calculation** - Real-time profit margin calculation per order
- **Customer Profiles** - Comprehensive customer data management
- **Settings & Preferences** - User-specific profile and password management

### 🔐 Security & Authentication
- JWT-based secure authentication
- Bcrypt password hashing (10 salt rounds)
- Role-based route protection middleware
- Automatic token refresh and session management

### 🎨 Premium UI/UX
- **Cyber/Enterprise Dark Theme** - Professional glassmorphism design
- **Responsive Layout** - Mobile-first, fully responsive across all devices
- **Smooth Animations** - Framer Motion powered transitions
- **Interactive Charts** - Recharts integration for analytics visualization
- **Custom Components** - Modals, data tables, stat cards with glass effects

### 🛠️ Developer Experience
- Clean, modular codebase architecture
- Environment-based configuration
- Comprehensive error handling
- Git-ignored sensitive files

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 19** | UI library with hooks and context |
| **Vite** | Lightning-fast build tool |
| **Tailwind CSS v4** | Utility-first CSS framework |
| **DaisyUI v5** | Component library for Tailwind |
| **Framer Motion** | Animation library |
| **React Router v7** | Client-side routing |
| **Axios** | HTTP client with interceptors |
| **Recharts** | Chart library for analytics |
| **Lucide React** | Modern icon set |
| **React Hot Toast** | Notification system |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime |
| **Express.js** | Web application framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | ODM for MongoDB |
| **JWT** | Token-based authentication |
| **Bcrypt** | Password hashing |
| **Node-Cron** | Task scheduling |
| **CORS** | Cross-origin resource sharing |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abdulmazid24/DropForge.git
   cd DropForge
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Configure environment variables**
   
   Create a `.env` file in the `server/` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

5. **Seed the database (optional)**
   ```bash
   cd server
   node reset-admin.js
   ```
   This creates a Super Admin user for initial access.

### Running the Application

**Development Mode:**

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   # or
   node index.js
   ```
   Server runs on: `http://localhost:5000`

2. **Start the frontend client** (in a new terminal)
   ```bash
   cd client
   npm run dev
   ```
   Client runs on: `http://localhost:5173`

3. **Access the application**
   - Frontend: `http://localhost:5173`
   - API: `http://localhost:5000/api`

---

## 📁 Project Structure

```
DropForge/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── layout/       # Layout components (Sidebar, Navbar)
│   │   │   └── ui/           # UI components (Modal, etc.)
│   │   ├── context/          # React Context (AuthContext)
│   │   ├── pages/            # Page components
│   │   │   ├── auth/         # Login, Register
│   │   │   └── dashboard/    # Dashboard pages
│   │   ├── utils/            # Utilities (API config)
│   │   ├── App.jsx           # Main app component
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Global styles (Tailwind)
│   ├── public/               # Static assets
│   ├── index.html            # HTML template
│   ├── vite.config.js        # Vite configuration
│   └── tailwind.config.js    # Tailwind configuration
│
├── server/                    # Express backend
│   ├── controllers/          # Route controllers
│   │   ├── userController.js
│   │   └── orderController.js
│   ├── middleware/           # Custom middleware
│   │   └── authMiddleware.js
│   ├── models/               # Mongoose models
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/               # API routes
│   │   ├── userRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── productRoutes.js
│   │   └── supplierRoutes.js
│   ├── services/             # Business logic
│   │   └── supplierService.js
│   ├── jobs/                 # Cron jobs
│   │   └── cron.js
│   ├── index.js              # Server entry point
│   └── .env                  # Environment variables
│
├── .gitignore                # Git ignore rules
├── README.md                 # Project documentation
└── USER_GUIDE.md             # User manual
```

---

## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/users` | Register new user | No |
| POST | `/users/login` | User login | No |
| GET | `/users/me` | Get current user profile | Yes (JWT) |
| PUT | `/users/profile` | Update user profile | Yes (JWT) |
| GET | `/users` | Get all users | Yes (Admin) |

### Product Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/products` | Get all products | No |
| GET | `/products/:id` | Get product by ID | No |

### Order Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/orders` | Create new order | Yes (JWT) |
| GET | `/orders` | Get user/all orders | Yes (JWT) |
| GET | `/orders/:id` | Get order by ID | Yes (JWT) |
| PUT | `/orders/:id/status` | Update order status | Yes (Admin) |

### Supplier Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/supplier/sync` | Trigger manual product sync | Yes (Admin) |

---

## 📸 Screenshots

### Dashboard Overview
Modern analytics dashboard with glassmorphism design, real-time metrics, and interactive charts.

### Product Management
Grid-based product catalog with search, filter, and quick order creation.

### Order Tracking
Comprehensive order table with status badges, customer details, and order history.

### User Management
Admin-only interface for managing customer accounts and permissions.

---

## 🚢 Deployment

### Production Build

**Frontend:**
```bash
cd client
npm run build
```
Output: `client/dist/`

**Backend:**
```bash
cd server
npm start
# or
node index.js
```

### Deployment Platforms

**Recommended Options:**
- **Frontend**: Vercel, Netlify, AWS S3 + CloudFront
- **Backend**: Heroku, Render, AWS EC2, DigitalOcean
- **Database**: MongoDB Atlas (Cloud)

### Environment Variables for Production

Ensure the following are set on your hosting platform:
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Strong secret key for JWT
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Set to `production`

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Developer

**Abdul Mazid**
- GitHub: [@Abdulmazid24](https://github.com/Abdulmazid24)
- Portfolio: [Your Portfolio Link]

---

## 🙏 Acknowledgments

- UI inspiration from modern enterprise SaaS platforms
- Icons by [Lucide](https://lucide.dev/)
- Font families: Outfit & Inter (Google Fonts)

---

<div align="center">

**Built with ❤️ using the MERN Stack**

⭐ Star this repo if you find it helpful!

</div>
