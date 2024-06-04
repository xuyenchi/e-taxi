const express = require("express");
const hanhtrinhController = require("../controllers/hanhtrinhController");

const router = express.Router();

// mở GET api tìm danh sách địa điểm theo từ khóa http://localhost:port/api/hanhtrinh/searchdiadiem
router.get("/searchdiadiem", hanhtrinhController.searchDiaDiem);

// mở GET api lấy tọa độ của địa điểm http://localhost:port/api/hanhtrinh/detaildiadiem
router.get("/detaildiadiem", hanhtrinhController.detailDiaDiem);

// mở PUT api nhận hành trình http://localhost:port/api/hanhtrinh/nhan
router.put("/nhan", hanhtrinhController.nhanHanhTrinh);

// mở PUT api hủy hành trình http://localhost:port/api/hanhtrinh/huy
router.put("/huy", hanhtrinhController.huyHanhTrinh);

// mở GET api tìm đường đi http://localhost:port/api/hanhtrinh/duongdi
router.get("/duongdi", hanhtrinhController.directionDuongDi);

module.exports = router;