# DropForge 🚀

**Enterprise Dropshipping Platform for the Modern Era.**

DropForge is a scalable, highly performant, and aesthetically premium platform designed to streamline dropshipping operations. Built with the **MERN Stack** and designed with a "Cyber/Enterprise" philosophy.

![Status](https://img.shields.io/badge/Status-Development-blue)
![Stack](https://img.shields.io/badge/Stack-MERN-green)
![License](https://img.shields.io/badge/License-Proprietary-red)

## ✨ Key Features

*   **🛡️ Robust Security**: JWT-based Authentication with Role-Based Access Control (Super Admin, Admin, Supplier, Customer).
*   **🔄 Automated Supplier Sync**: Integrated Service Layer that syncs products and stock levels every 6 hours automatically.
*   **📊 Smart Dashboard**: Real-time analytics with animated charts (`Recharts`) and live statistic cards.
*   **🎨 Premium UI/UX**: 
    *   **Glassmorphism** design language.
    *   **Dark Mode** native (Deep Navy + Neon Accents).
    *   **Smooth Animations** powered by `Framer Motion`.
*   **📦 Order Management**: Full lifecycle tracking from "Pending" to "Delivered" with automated profit calculation.

## 🛠️ Tech Stack

### Frontend
*   **React.js (Vite)**: Fast, modern UI library.
*   **Tailwind CSS**: Utility-first styling with custom "Enterprise" theme.
*   **Framer Motion**: Complex animations and interactions.
*   **Lucide React**: Beautiful, consistent icon set.
*   **Recharts**: Data visualization.

### Backend
*   **Node.js & Express**: Scalable server-side runtime.
*   **MongoDB & Mongoose**: Flexible NoSQL database with complex Schemas.
*   **Node-Cron**: Task scheduling for supplier synchronization.
*   **JWT**: Stateless authentication.

## 📂 Project Structure

```bash
DropForge/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # Global State (Auth)
│   │   ├── pages/          # Application Views
│   │   └── utils/          # Helpers (API)
├── server/                 # Node.js Backend
│   ├── controllers/        # Route Logic
│   ├── models/             # Database Schemas
│   ├── routes/             # API Endpoints
│   └── services/           # Business Logic (Supplier Sync)
└── USER_GUIDE.md           # Admin Manual
```

## 🚀 Deployment

1.  **Server**: Deploy to AWS EC2, DigitalOcean, or Heroku.
2.  **Client**: Deploy to Vercel or Netlify.
3.  **Database**: MongoDB Atlas (Cloud).

---
*Built with ❤️ by [Your Name/Agency]*
