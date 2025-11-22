const readline = require('readline');

// Wait 2.5 seconds so the server logs don't mess up the menu
setTimeout(function() {

    // Sets up the interface to read input from the keyboard and print output to the terminal
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    // Main function to show the menu again and again
    function showMainMenu() {
        console.log("\n--- API URL Generator ---");
        console.log("1. Filter by Location (e.g., London)");
        console.log("2. Filter by Date Range (e.g., 2020 to 2022)");
        console.log("3. Show All Data");
        console.log("4. REPORT: Sightings per Region (Count)");
        console.log("5. REPORT: Monthly Trends (Timeline)");
        console.log("6. Exit");

        rl.question('Select an option (1-6): ', function(option) {
            handleOption(option);
        });
    }

    // Handle the logic separately so we can loop back
    function handleOption(option) {
          if (option === '1') {
            //Validation Function ---
            askForCity();

        } else if (option === '2') {
            // Date Range Filter
            rl.question('Enter START date (YYYY-MM-DD): ', function(start) {
                rl.question('Enter END date (YYYY-MM-DD): ', function(end) {
                    printResult("http://localhost:3000/ticks/range/" + start + "/" + end);
                });
            });

        } else if (option === '3') {
            // Show All
            printResult("http://localhost:3000/ticks");

        } else if (option === '4') {
            // REPORT: Region
            printResult("http://localhost:3000/ticks/stats/by-location");

        } else if (option === '5') {
            // REPORT: Trends
            printResult("http://localhost:3000/ticks/stats/monthly-trend");

        } else if (option === '6') {
            // Exit
            console.log("Press CTRL+C to exit.");
            rl.close();
            process.exit(0);

        } else {
            console.log("Invalid option. Please try again.");
            showMainMenu();
        }
    }

    
function askForCity() {
        // Define valid cities
        const validCities = [
            "manchester", "london", "glasgow", "birmingham", 
            "southampton", "nottingham", "sheffield", "liverpool", 
            "edinburgh", "newcastle", "leicester", "bristol", 
            "cardiff", "leeds"
        ];

        rl.question('Enter city name: ', function(input) {
            const cityLower = input.trim().toLowerCase();

            // Check if input is in the list
            if (validCities.includes(cityLower)) {
                // Valid City
                const formattedCity = cityLower.charAt(0).toUpperCase() + cityLower.slice(1);
                printResult("http://localhost:3000/ticks/location/" + formattedCity);
            } else {
                // Invalid City
                console.log("\nSorry, that city isn't part of the list.");
                console.log("Accepted cities: " + validCities.join(", "));
                console.log("Try again (or type 'menu' to go back).\n");
                
                if (cityLower === 'menu') {
                    showMainMenu();
                } else {
                    askForCity(); //Runs this function again
                }
            }
        });
    }

    // function to print the URL and ask to return
    function printResult(url) {
        console.log("\nCopy this URL:");
        console.log(url);
        console.log("-----------------------------");

       rl.question('Press ENTER to return to the menu (Press Ctrl+C to exit)...', function(answer) {
          showMainMenu();
        });
    }

    // Start the menu
    showMainMenu();

}, 1800);