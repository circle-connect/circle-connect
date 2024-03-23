const express = require("express");
const cors = require("cors");
const fs = require('fs');
const https = require('https');
require('dotenv').config();
require('./models/db');

const app = express();
const PORT = process.env.PORT || 443; // 443 هو المنفذ الافتراضي لـ HTTPS

const usersRouter = require("./routes/users");
const infoRouter = require('./routes/info');

app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);
app.use("/info",infoRouter);

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

// استخدم مسار الملفات الخاصة بك هنا
const httpsOptions = {
  key: fs.readFileSync('/root/key.pem'), // تحديث المسار إلى مكان المفتاح الخاص
  cert: fs.readFileSync('/root/cert.pem') // تحديث المسار إلى مكان شهادة SSL
};

https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`Server listening at https://localhost:${PORT}`);
});
