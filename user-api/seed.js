const ExcelJS = require('exceljs');
const path = require('path');
const sequelize = require('./common/database');
const defineTick = require('./common/models/Tick'); 

const Tick = defineTick(sequelize);

async function importFromExcel() {
  console.log("Script started...");

  try {
    // 1. Sync Database
    await sequelize.sync({ alter: true });
    console.log("Database connected.");

    // 2. Locate File
    const filePath = path.join(__dirname, 'Tick Sightings.xlsx');
    console.log(`Reading file from: ${filePath}`);

    // 3. Read the Excel File using ExcelJS
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    
    const worksheet = workbook.getWorksheet(1); // Get the first sheet
    console.log(`Sheet found with ${worksheet.rowCount} rows.`);

    const ticksToInsert = [];

    // 4. Loop through every row (Skipping row 1 because it's headers)
    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return; // Skip Header Row

        // ExcelJS columns start at 1, not 0.
        const rowData = {
            id:        row.getCell(1).value,
            date:      row.getCell(2).value,
            location:  row.getCell(3).value,
            species:   row.getCell(4).value,
            latinName: row.getCell(5).value
        };

        // Only add if we have an ID
        if (rowData.id) {
            ticksToInsert.push(rowData);
        }
    });

    // 5. Insert into Database
    if (ticksToInsert.length > 0) {
      await Tick.bulkCreate(ticksToInsert, { ignoreDuplicates: true });
      console.log(`SUCCESS! Imported ${ticksToInsert.length} ticks into the database.`);
    } else {
      console.log("No data found to import.");
    }

  } catch (error) {
    console.error("Error:", error.message);
    if (error.code === 'ENOENT') {
        console.log("   -> The file 'Tick Sightings.xlsx' is missing.");
    }
  }
}

importFromExcel();