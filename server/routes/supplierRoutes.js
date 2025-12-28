const express = require('express');
const router = express.Router();
const { syncProducts } = require('../services/supplierService');
const { protect, admin } = require('../middleware/authMiddleware');

// @desc    Manually trigger product sync
// @route   POST /api/supplier/sync
// @access  Private/Admin
router.post('/sync', protect, admin, async (req, res) => {
    try {
        const stats = await syncProducts();
        res.json({ message: 'Product Sync Completed', stats });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Sync Failed' });
    }
});

module.exports = router;
