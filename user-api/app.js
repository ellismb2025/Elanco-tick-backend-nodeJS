const express = require('express');
const app = express();
const sequelize = require('./common/database');
const ErrorHandler = require('./common/middlewares/ErrorHandler')


const defineTick = require('./common/models/Tick');
const Tick = defineTick(sequelize);

app.use(express.json());

// Sync database
sequelize.sync({ alter: true })
  .then(() => console.log('Database synced successfully.'))
  .catch(err => console.error('Error syncing database:', err));


const tickRoutes = require('./ticks/routes');
app.use('/ticks', tickRoutes);

// status check
app.get('/status', (req, res) => {
  res.json({ status: 'Running' });
});

app.use(ErrorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));