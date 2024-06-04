const express = require("express");
const hanhtrinhController = require("../controllers/hanhtrinhController");

const router = express.Router();

// mở GET api lấy tất cả thông tin hành trình http://localhost:port/api/hanhtrinh
router.get("/", hanhtrinhController.getAllHanhTrinh);

// mở POST api tạo hành trình http://localhost:port/api/hanhtrinh
router.post("/", hanhtrinhController.addHanhTrinh);

// mở GET api tìm địa chỉ theo từ khóa http://localhost:port/api/hanhtrinh/searchdiadiem
router.get("/searchdiadiem", hanhtrinhController.searchDiaDiem);

// mở GET api lấy tọa độ của địa điểm http://localhost:port/api/hanhtrinh/detaildiadiem
router.get("/detaildiadiem", hanhtrinhController.detailDiaDiem);

module.exports = router;