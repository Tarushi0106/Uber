const express = require('express');
const app = express();
app.use(express.json())

const cookieParser = require('cookie-parser');

const dotenv = require('dotenv');
dotenv.config();  
const cors = require('cors');
app.use(cors());

const connectToDb = require('./db/db');
connectToDb();


const userRoutes = require('./router/user.routes');
const captainRoutes = require('./router/captain.route');
const mapsRoutes = require('./router/maps.routes');
const rideRoutes = require('./router/ride.routes');

app.get('/', (req, res) => {
    res.send("Hello World");
});
app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapsRoutes);
app.use('/rides', rideRoutes);

module.exports = app;
