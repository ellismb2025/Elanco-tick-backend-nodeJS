const router = require('express').Router();
const TickController = require('./controller');

// --- STANDARD OPERATIONS ---

// POST http://localhost:3000/ticks
router.post('/', TickController.createTick);

// GET http://localhost:3000/ticks
router.get('/', TickController.getAllTicks);


// --- FILTERS ---

// GET http://localhost:3000/ticks/location/London
router.get('/location/:locationName', TickController.getTicksByLocation);

// GET http://localhost:3000/ticks/range/2020-01-01/2023-01-01
router.get('/range/:startDate/:endDate', TickController.getTicksByDateRange);


// --- REPORTING (Aggregate Data) ---

// GET http://localhost:3000/ticks/stats/by-location
router.get('/stats/by-location', TickController.getReportByLocation);

// GET http://localhost:3000/ticks/stats/monthly-trend
router.get('/stats/monthly-trend', TickController.getReportOverTime);

module.exports = router;