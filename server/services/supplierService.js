const axios = require('axios');
const Product = require('../models/Product');

// Mock Supplier API URL - Replace with actual URL in production
// const SUPPLIER_API_URL = 'https://supplier-laravel-system.com/api/products';

const fetchProductsFromSupplier = async () => {
    try {
        // Mock Data for Phase 1
        // In real scenario: const response = await axios.get(SUPPLIER_API_URL);
        // return response.data;

        console.log('Fetching products from supplier (Mocked)...');
        return [
            {
                id: 'SUP-001',
                title: 'Premium Leather Wallet',
                cost_price: 500,
                stock: 'in_stock'
            },
            {
                id: 'SUP-002',
                title: 'Wireless Earbuds',
                cost_price: 1200,
                stock: 'out_of_stock'
            },
            {
                id: 'SUP-003',
                title: 'Smart Watch Series 5',
                cost_price: 2500,
                stock: 'in_stock'
            }
        ];
    } catch (error) {
        console.error('Error fetching from supplier:', error.message);
        return [];
    }
};

const syncProducts = async () => {
    console.log('--- Starting Product Sync ---');
    const supplierProducts = await fetchProductsFromSupplier();

    if (!supplierProducts || supplierProducts.length === 0) {
        console.log('No products found from supplier.');
        return;
    }

    let stats = { added: 0, updated: 0, total: supplierProducts.length };

    for (const item of supplierProducts) {
        // Business Rule: Calculate Selling Price (e.g., Cost + 20% + Fixed Profit)
        // For now, let's say Cost * 1.5
        const sellingPrice = Math.ceil(item.cost_price * 1.5);

        // Check if product exists
        let product = await Product.findOne({ supplierProductId: item.id });

        if (product) {
            // Update existing
            product.title = item.title;
            product.costPrice = item.cost_price;
            product.sellingPrice = sellingPrice;
            product.stockStatus = item.stock;
            await product.save();
            stats.updated++;
        } else {
            // Create new
            await Product.create({
                supplierProductId: item.id,
                title: item.title,
                costPrice: item.cost_price,
                sellingPrice: sellingPrice,
                stockStatus: item.stock
            });
            stats.added++;
        }
    }

    console.log(`--- Sync Complete: Added ${stats.added}, Updated ${stats.updated} ---`);
    return stats;
};

module.exports = {
    syncProducts
};
