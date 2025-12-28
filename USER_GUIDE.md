# DropForge - User Guide & Administrator Manual

Welcome to **DropForge**, the Enterprise Dropshipping Platform. This guide will help you set up, run, and manage the platform.

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18 or higher) installed.
*   MongoDB Database (URI provided in credentials).
*   Git installed.

### Installation
1.  **Clone the Repository**
    ```bash
    git clone https://github.com/Abdulmazid24/DropForge.git
    cd DropForge
    ```

2.  **Install Dependencies** (Root, Server, and Client)
    ```bash
    # Install Root dependencies
    npm install

    # Install Server dependencies
    cd server
    npm install

    # Install Client dependencies
    cd ../client
    npm install
    ```

### Running the Application
You can run both the backend and frontend concurrently from the root directory (if configured) or separate terminals.

**Terminal 1 (Backend):**
```bash
cd server
npm start
# Output: Server running on port 5000...
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
# Output: Local: http://localhost:5173/
```

---

## 🖥️ Platform Features

### 1. Authentication
*   **Login**: Access the platform using your verified Phone Number and Password.
*   **Security**: All sessions are protected with JWT (JSON Web Tokens).

### 2. Dashboard Overview
*   **Real-Time Stats**: View Total Sales, Orders, Products, and Net Profit instantly.
*   **Analytics**: Interactive charts showing revenue and profit trends over time.

### 3. Product Management (`/dashboard/products`)
*   **Inventory**: View all dropshipping products in a modern Grid View.
*   **Search**: Quickly find products by title.
*   **Stock Status**: "In Stock" and "Stock Out" indicators are automatically updated via Supplier Sync.

### 4. Order Management (`/dashboard/orders`)
*   **Order List**: A high-density table view for managing high volumes of orders.
*   **Status Tracking**: 
    *   🟡 **Pending**: Order placed, waiting for processing.
    *   🔵 **Shipped**: Handed over to courier.
    *   🟢 **Delivered**: Successfully reached the customer.
*   **Profit Calculation**: The system automatically calculates your profit (`Selling Price - Cost Price`) for every order.

### 5. Supplier Integration (Automated)
*   **Auto-Sync**: The system connects to the Supplier API every **6 hours** to fetch new products and update stock levels.
*   **Manual Trigger**: Admins can force a sync if needed (Backend API).

---

## 🛠️ Troubleshooting

**Q: Products are not loading?**
*   Ensure the Backend Server is running on Port 5000.
*   Check if the MongoDB connection is active in the server logs.

**Q: Login fails?**
*   Verify you are using the correct credentials (e.g., Super Admin phone).
*   Check the server console for any error messages.

**Q: Styles looking weird?**
*   Ensure you ran `npm install` in the `client` directory to install Tailwind CSS dependencies.
