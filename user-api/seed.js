const XLSX = require('xlsx');
const path = require('path');
const sequelize = require('./common/database');
const defineTick = require('./common/models/Tick'); 

// Initialize the model
const Tick = defineTick(sequelize);

async function importFromExcel() {
  try {
    // Ensure the database table exists 
    await sequelize.sync({ alter: true });

    // Read the Excel File
    const filePath = path.join(__dirname, 'Tick Sightings.xlsx');
    console.log(`Reading Excel file from: ${filePath}`);

    // Load the workbook
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Get the first sheet
    const sheet = workbook.Sheets[sheetName];

    // Convert Excel data to JSON
    const rawData = XLSX.utils.sheet_to_json(sheet, { raw: false, dateNF: 'yyyy-mm-dd' });

    // Map Excel columns to Database columns
    const ticksToInsert = rawData.map(row => ({
      id: row.id,
      date: row.date,
      location: row.location,
      species: row.species,
      latinName: row.latinName
    }));

    // 5. Bulk Insert into Database
    if (ticksToInsert.length > 0) {
      await Tick.bulkCreate(ticksToInsert, { ignoreDuplicates: true });
      console.log(`Success! Imported ${ticksToInsert.length} ticks from Excel.`);
    } else {
      console.log('The Excel file appears to be empty or could not be read.');
    }

  } catch (error) {
    console.error('Error importing Excel file:', error.message);
    if (error.code === 'MODULE_NOT_FOUND') {
        console.log(" Did you run 'npm install xlsx'?");
    }
    if (error.code === 'ENOENT') {
        console.log("Cannot find 'Tick Sightings.xlsx'.");
    }
  }
}

importFromExcel();