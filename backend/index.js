const express = require("express");
const cors = require("cors");
const fs = require('fs');
const https = require('https');
require('dotenv').config();
require('./models/db');

const app = express();
const PORT = process.env.PORT || 443; // تحديث المنفذ إلى 443 لأنه المنفذ الافتراضي لـ HTTPS

const usersRouter = require("./routes/users");
const infoRouter = require('./routes/info');

app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);
app.use("/info",infoRouter);

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

// تحديث المسارات للمفتاح الخاص وشهادة SSL
const httpsOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/jalal.store-0001/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/jalal.store-0001/fullchain.pem')
};

https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`Server listening at https://localhost:${PORT}`);
});
