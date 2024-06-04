const express = require("express");
const hanhtrinhController = require("../controllers/hanhtrinhController");

const router = express.Router();

// mở GET api lấy tất cả hành trình http://localhost:port/api/hanhtrinh/ 
router.get("/", hanhtrinhController.getAllHanhTrinh);

// mở GET api lấy chi tiết hành trình http://localhost:port/api/hanhtrinh/chitiet
router.get("/chitiet", hanhtrinhController.detailHanhTrinh);

// mở POST api tạo hành trình http://localhost:port/api/hanhtrinh/
router.post("/", (req, res) => {
    hanhtrinhController.addHanhTrinh(req, res);
});

// mở PUT api xác nhận hành trình http://localhost:port/api/hanhtrinh/ 
router.put("/nhan", (req, res) => {
    hanhtrinhController.nhanHanhTrinh(req, res);
});

// mở PUT api hủy hành trình http://localhost:port/api/hanhtrinh/ 
router.put("/huy", (req, res) => {
    hanhtrinhController.huyHanhTrinh(req, res);
});

module.exports = router;