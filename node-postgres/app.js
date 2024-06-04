const express = require('express');
const CONFIG = require('./config');
const app = express();

const port = CONFIG.APP_PORT;

app.use(express.json());

app.listen(port, () => {
    console.log(`Taxi API đã khởi tạo với port ${port}.`);
});

// mở api cho module người dùng với đường dẫn 'http://localhost:port/api/nguoidung'
const nguoidungRoutes = require("./api/routes/nguoidungRoutes");
app.use("/api/nguoidung", nguoidungRoutes);

// mở api cho module hành trình với đường dẫn 'http://localhost:port/api/hanhtrinh'
const hanhtrinhRoutes = require("./api/routes/hanhtrinhRoutes");
app.use("/api/hanhtrinh", hanhtrinhRoutes);
