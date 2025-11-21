1. Architectural Decisions
For this  task, I chose a Layered Architecture using the Node.js runtime and the Express.js framework. This was becuase based on my research they help make lightweight, scalable, and easily testable API. I also found documentation and tutorials to follow [text](https://blog.postman.com/how-to-create-a-rest-api-with-node-js-and-express/), and was recomended to use it.

Key Technology Choices:

    Runtime: Node.js & ExpressJS

        Why: Node.js has its own built in error handling whihc I used when testing to see what was wrong. It is also highly scalable which means in the future if I or someone else wanted to do more with the project it would be fairly easy to impliment to other things. I also used ExpressJS which has the benefit of being a lightweight framework which helps with performance and speed of the application. It is also easy to use as it is a well documented framework.

    Database: SQLite

        Why: For a standalone technical assessment, SQLite is the best choice. It is serverless and stores data in a single file (data.db). This makes sure that the application runs immediately for the user without needing to install or configure an external database server.

    ORM: Sequelize

        Why: Instead of writing raw SQL queries, I used Sequelize. This is becuase it has automatic protection against attacks like SQL injections, It also allows switching databases without having to rewrite code. I can also use it for validation as it makes sure there's data consistency before going to the database. 

    Design Pattern: MVC (Model-View-Controller)

        I separated the application into distinct layers:

            Models (common/models): Defines the data structure and validation rules.

            Controllers (ticks/controller): Handles the business logic.

            Routes (ticks/routes): Maps URLs to specific controller functions.

            Benefit: This separation makes the codebase modular, easier to read, and easier to test and can allow for future developers to jump straight in.

2. Data Consumption & Presentation
Data Ingestion (Consumption)

The system consumes data in two main ways:

    1. Batch Import (Excel):

        . The (seed.js) script uses the xlsx library to parse the provided spreadsheet.

        . The data is mapped to the Sequelize model and all data that shopuldn't be there is removed or modified, and bulk-inserted into the SQLite database.

        . Handling Inconsistencies: The script normalises headers and filters out empty rows to ensure database integrity.

    2. Real-time Entry (API):

        . The POST /ticks endpoint accepts JSON payloads.

        . Incoming data passes through a custom Error Handling middleware. If fields are missing or formatted incorrectly, the API rejects the request with a 400 Bad Request and a clear error message.

Data Presentation (Output)

Data is presented as standard JSON responses via RESTful endpoints. I implemented three tiers of data access:

    1. Raw Data: Full lists of sightings (GET /ticks).

    2. Filtered Data: Specific subsets based on user query parameters (Location and Date Range).

    3. Aggregated Insights:

        . Region Reports: Uses SQL COUNT and GROUP BY to rank high-risk locations.

        . Time Trends: Uses SQL date formatting (strftime) to group sightings by month, providing a timeline view.


![alt text](image.png)

3. Future Improvements & Trade-offs
Given more time and a production environment requirement, I would implement the following improvements:

    1. Unit & Integration Testing
    
        Current State: Testing is done manually via Postman. This works but it is quite time consuming.

        Improvement: Implement Jest and Supertest.

            Unit Tests: Test the controller logic on its own.

            Integration Tests: Test the full request/response cycle against a test database.

    2. Security & Authentication
    
        Current State: The API is public.

        Improvement: Implement JWT (JSON Web Tokens) or API Keys.

            Write operations (POST, DELETE) should be restricted to authorized users/admins.

            Implement Rate Limiting to prevent abuse or DDoS attacks. As right now anyone can send lots of requests at anyone time which can crash the server.

    3. Database Scalability

        Current State: SQLite.

        Improvement: Migrate to PostgreSQL.

        SQLite has limitations on concurrent writes. For a high-traffic system tracking tick sightings nationwide, PostgreSQL handles concurrency much better.

    4. AI/ML Forecasting

        Concept: Create a separate microservice that using past and current trends to predict where ticks might go or the number of ticks ect. 

