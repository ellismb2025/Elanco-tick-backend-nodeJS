const readline = require('readline');

// Wait 2.5 seconds so the server logs don't mess up the menu
setTimeout(function() {

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    console.log("\n--- API URL Generator ---");
    console.log("1. Filter by Location (e.g., London)");
    console.log("2. Filter by Date Range (e.g., 2020 to 2022)");
    console.log("3. Show All Data");
    console.log("4. REPORT: Sightings per Region (Count)");
    console.log("5. REPORT: Monthly Trends (Timeline)");

    rl.question('Select an option (1-5): ', function(option) {

      if (option === '1') {
          // Location Filter
          rl.question('Enter city name: ', function(city) {
            // Capitalize the first letter
            const formattedCity = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
            
            console.log("\nCopy this URL:");
            console.log("http://localhost:3000/ticks/location/" + formattedCity);
            rl.close();
            process.exit(0);
          });

      } else if (option === '2') {
        // Date Range Filter
        rl.question('Enter START date (YYYY-MM-DD): ', function(start) {
          rl.question('Enter END date (YYYY-MM-DD): ', function(end) {
            console.log("\nCopy this URL:");
            console.log("http://localhost:3000/ticks/range/" + start + "/" + end);
            rl.close();
            process.exit(0);
          });
        });

      } else if (option === '3') {
        // Show All
        console.log("\nCopy this URL:");
        console.log("http://localhost:3000/ticks");
        rl.close();
        process.exit(0);

      } else if (option === '4') {
        // REPORT: Region
        console.log("\nCopy this URL to see which cities have the most ticks:");
        console.log("http://localhost:3000/ticks/stats/by-location");
        rl.close();
        process.exit(0);

      } else if (option === '5') {
        // REPORT: Trends
        console.log("\nCopy this URL to see the timeline of sightings:");
        console.log("\n(You can Ctrl+Click the link below)");
        console.log("http://localhost:3000/ticks/stats/monthly-trend");
        rl.close();
        process.exit(0);

      } else {
        console.log("Invalid option.");
        rl.close();
        process.exit(0);
      }
    });

}, 2500);