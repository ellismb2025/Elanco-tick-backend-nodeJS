const { Op } = require('sequelize');
const sequelize = require('../common/database'); // We need the connection for special SQL functions
const defineTick = require('../common/models/Tick'); 
const Tick = defineTick(sequelize);

// --- STANDARD ENDPOINTS ---

// 1. Create (POST)
exports.createTick = async (req, res, next) => {
  try {
    const { id, date, location, species, latinName } = req.body;

    // MANUAL VALIDATION: Check for missing fields immediately
    if (!id || !date || !location || !species) {
      return res.status(400).json({ 
        success: false, 
        error: "Missing required fields. Please provide id, date, location, and species." 
      });
    }

    const newTick = await Tick.create({ id, date, location, species, latinName });
    res.status(201).json({ success: true, data: newTick });

  } catch (err) {
    // Pass errors to the new Central Error Handler
    next(err); 
  }
};

// 2. Get All (GET)
exports.getAllTicks = async (req, res) => {
  try {
    const ticks = await Tick.findAll();
    res.status(200).json({ success: true, data: ticks });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


// 3. Get Ticks by Location (Case Insensitive and error message if not found)
exports.getTicksByLocation = async (req, res) => {
  try {
    const { locationName } = req.params;
    
    const ticks = await Tick.findAll({
      where: sequelize.where(
        sequelize.fn('lower', sequelize.col('location')), 
        locationName.toLowerCase()
      )
    });

    if (ticks.length === 0) {
        return res.status(404).json({ 
            success: false, 
            error: "Location not found. Please check the spelling and try again." 
        });
    }

    res.status(200).json({ success: true, count: ticks.length, data: ticks });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 4. Filter by Date Range
exports.getTicksByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.params;
    const ticks = await Tick.findAll({
      where: {
        date: { [Op.between]: [startDate, endDate] }
      }
    });
    res.status(200).json({ success: true, count: ticks.length, data: ticks });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


// 5. Report: Number of sightings per region
exports.getReportByLocation = async (req, res) => {
  try {
    const report = await Tick.findAll({
      attributes: [
        'location',
        [sequelize.fn('COUNT', sequelize.col('id')), 'total_sightings']
      ],
      group: ['location'],
      order: [[sequelize.fn('COUNT', sequelize.col('id')), 'DESC']]
    });

    res.status(200).json({ success: true, data: report });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 6. Report: Trends over time (Monthly)
exports.getReportOverTime = async (req, res) => {
  try {
    const report = await Tick.findAll({
      attributes: [
        // Extract Year-Month from date and count sightings in sqlite 
        [sequelize.fn('strftime', '%Y-%m', sequelize.col('date')), 'month'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'total_sightings']
      ],
      group: ['month'],
      order: [['month', 'ASC']]
    });

    res.status(200).json({ success: true, data: report });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};