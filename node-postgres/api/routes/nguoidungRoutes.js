const express = require("express");
const nguoidungController = require("../controllers/nguoidungController");

const router = express.Router();

// mở GET api lấy tất cả người dùng http://localhost:port/api/nguoidung
router.get("/", nguoidungController.getAllNguoiDung);

// mở POST api tạo người dùng mới http://localhost:port/api/nguoidung
router.post("/", (req, res) => {
    nguoidungController.addNguoiDung(req, res);
});

// mở POST api đăng nhập http://localhost:port/api/nguoidung/dangnhap
router.post("/dangnhap", (req, res) => {
    nguoidungController.loginNguoiDung(req, res);
});

// mở GET api tìm tài xế xe http://localhost:port/api/nguoidung/timtaixe
router.get("/timtaixe", nguoidungController.getAllTaiXe);

// mở PUT api cập nhật tọa độ tài xế http://localhost:port/api/nguoidung/capnhattoado
router.put("/capnhattoato", (req, res) => {
    nguoidungController.updateToaDoNguoiDung(req, res);
});

module.exports = router;