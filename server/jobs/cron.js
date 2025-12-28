const cron = require('node-cron');
const { syncProducts } = require('../services/supplierService');

const initCronJobs = () => {
    // Schedule task to run every 6 hours
    // Cron expression: '0 */6 * * *' (At minute 0 past every 6th hour)
    cron.schedule('0 */6 * * *', async () => {
        console.log('Running Scheduled Product Sync...');
        await syncProducts();
    });

    console.log('Cron Job Initialized: Product Sync scheduled every 6 hours.');
};

module.exports = initCronJobs;
