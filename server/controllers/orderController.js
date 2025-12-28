const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        return res.status(400).json({ message: 'No order items' });
    } else {
        // Generate a unique local order ID (e.g., ORD-Timestamp-Random)
        const localOrderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        let totalProfit = 0;
        const processedItems = [];

        // Validate stock and calculate profit
        for (const item of orderItems) {
            const product = await Product.findById(item.product);

            if (!product) {
                return res.status(404).json({ message: `Product not found: ${item.product}` });
            }

            if (product.stockStatus !== 'in_stock') {
                return res.status(400).json({ message: `Product out of stock: ${product.title}` });
            }

            // Profit = (Selling - Cost) * Quantity
            const profitPerItem = (product.sellingPrice - product.costPrice) * item.qty;
            totalProfit += profitPerItem;

            processedItems.push({
                productId: product._id,
                quantity: item.qty,
                priceAtPurchase: product.sellingPrice
            });
        }

        const order = new Order({
            localOrderId,
            user: req.user._id, // Connected to logged in user
            customerInfo: {
                name: shippingAddress.name,
                phone: shippingAddress.phone,
                address: shippingAddress.address,
                city: shippingAddress.city
            },
            products: processedItems,
            profit: totalProfit,
            status: 'pending'
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.id).populate('products.productId', 'title sellingPrice');

    if (order) {
        // specific check: Ensure user owns order or is admin
        if (req.user.role === 'admin' || req.user.role === 'super_admin' || order.customerInfo.phone === req.user.phone) {
            // Note: Simplified check. Ideally we link Order 'user' field directly.
            // Implemented logic: If user created it (req.user._id matching order.user)
            if (order.user && order.user.toString() !== req.user._id.toString() && req.user.role === 'customer') {
                return res.status(401).json({ message: 'Not authorized to view this order' });
            }
            res.json(order);
        } else {
            // Fallback if not linked by user ID but maybe by phone? 
            // For Strict Enterprise: Only ID match.
            if (order.user && order.user.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }
            res.json(order);
        }
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin/Supplier
const updateOrderStatus = async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.status = req.body.status || order.status;
        order.courierStatus = req.body.courierStatus || order.courierStatus;

        if (req.body.supplierOrderId) {
            order.supplierOrderId = req.body.supplierOrderId;
        }

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
    // Assuming we added 'user' field to Order Model. 
    // Wait, Schema definition earlier didn't strictly show 'user' ref but 'customerInfo'.
    // Best practice: Add 'user' ref to Order schema for logged-in customers.
    // I will dynamically add it to schema or rely on customerInfo phone match if current Schema is rigid.
    // Let's check Schema... defined in task 140. "products", "customerInfo". No "user" ref.
    // I SHOULD UPDATE SCHEMA to include User ref for logged in users.

    // For now, let's query by customerInfo.phone? No, that's weak.
    // ACTION: I will update the Order Controller to assume schema might need 'user' 
    // OR query based on something available. 
    // Let's add 'user' field to Order Schema in a separate step or just assume it is there?
    // User requested "Enterprise". Enterprise means proper relationships.
    // I will add 'user' field to Order Schema first.

    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
};

module.exports = {
    addOrderItems,
    getOrderById,
    updateOrderStatus,
    getMyOrders,
    getOrders
};
