# Tick sightings Backend API

This is a Node.js/Express API for tracking tick sightings, created for the Elanco technical task. It allows the user to filter tick sightings based on date and location. It also allows the user to see a report based on the count of ticks sighted in a location as well as the sightings per month.

## Features
* **Menu -** Contains a menu in the terminal that allows the user to select what they want the program to do and gives links based on that. it runs both menu.js and app.js concurrently.
* **Advanced Filtering -** Filter data by **Location** and **Date Range** 
* **Excel Integration -** Automatically seeds the database from the spreadsheet.
* **SQLite Database -** Uses SQLite database for persistent data storage 

## Prerequisites
- Node.js installed

## Installation

### 1. Clone the repository:
   ```bash
   git clone https://github.com/ellismb2025/Elanco-tick-backend-nodeJS.git
   ```

### 2. Navigate the code:
In terminal
   ```bash
      cd Elanco-tick-backend-nodeJS
      cd user-api  
   ```

### 3. Install Dependencies:
   ```bash
      npm install 
   ```

### 4. Populate the Database:
   ```bash
      node seed.js
   ``` 

### 5. Run the Application:
   ```bash
      npm run dev
   ```


| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/ticks` | Retrieve all tick sightings |
| `POST` | `/ticks` | Submit a new tick sighting |
| `GET` | `/ticks/location/:locationName` | **Filter sightings by city (e.g., /ticks/location Manchester)** |
| `GET` | `/ticks/range/:startDate/:endDate` | Filter sightings based on date entered in format YYYY-MM-DD|
| `GET` | `/ticks/stats/by-location` | Count of sightings per city (Ordered High to Low)|
| `GET` | `/ticks/stats/monthly-trend` | Timeline of sightings grouped by month|


### Video link
   ```bash
      https://youtu.be/niFHoKsHAvs
   ```
