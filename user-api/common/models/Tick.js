const { DataTypes } = require('sequelize');

const TickModel = {
  // 1. ID: Matches the spreadsheet ID
  id: { 
    type: DataTypes.STRING, 
    primaryKey: true, 
    allowNull: false,
    validate: {
      notEmpty: true // Prevents empty IDs
    }
  },
  
  // 2. Date: Handles YYYY-MM-DD format
  date: { 
    type: DataTypes.DATEONLY, 
    allowNull: false,
    validate: {
      isDate: true, // Ensures it is a valid calendar date
      notEmpty: true
    }
  },

  // 3. Location 
  location: { 
    type: DataTypes.STRING, 
    allowNull: false,
    validate: {
      notEmpty: true // Prevents empty location names
    }
  },

  // 4. Species
  species: { 
    type: DataTypes.STRING, 
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  // 5. Latin Name
  latinName: { 
    type: DataTypes.STRING, 
    allowNull: false 
  }
};

module.exports = (sequelize) => sequelize.define('tick', TickModel);