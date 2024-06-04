const express = require("express");
const hanhtrinhController = require("../controllers/hanhtrinhController");

const router = express.Router();

// mở api POST tạo mới hành trình http://localhost:port/api/hanhtrinh
router.post("/", hanhtrinhController.addHanhTrinh);

// mở api GET lấy danh sách địa chỉ theo từ khóa tìm kiếm http://localhost:port/api/hanhtrinh/searchdiadiem
router.get("/searchdiadiem", hanhtrinhController.searchDiaDiem);

// mở api GET lấy tọa độ của địa điểm http://localhost:port/api/hanhtrinh/detaildiadiem
router.get("/detaildiadiem", hanhtrinhController.detailDiaDiem);

// mở api GET lấy địa chỉ từ tọa độ http://localhost:port/api/hanhtrinh/searchdiadiemtheotoado
router.get("/searchdiadiemtheotoado", hanhtrinhController.searchDiaDiemTheoToaDo);

module.exports = router;