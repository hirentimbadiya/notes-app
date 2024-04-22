const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const promMid = require("express-prometheus-middleware");
dotenv.config();

const app = express();

// CORS options
const corsOptions = {
  credentials: true,
  origin: ['https://inote.hirentimbadiya.me', 'http://localhost:3000']
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

const mongoURI = process.env.MONGODB_URI;
mongoose.set("strictQuery", false);
mongoose.connect(mongoURI).then(() => {
  console.log("Database Connected!");
}).catch((error) => {
  console.log("Error connecting to database: ", error);
});

app.use(
  promMid({
    metricsPath: "/metrics",
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
    requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
  })
);

app.get('/', (req, res) => {
  res.send('Server is Up and Running!')
});


app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`iNotebook Backend listening on port ${port}`)
});
