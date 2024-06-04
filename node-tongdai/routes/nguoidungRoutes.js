const express = require("express");
const nguoidungController = require("../controllers/nguoidungController");

const router = express.Router();

// mở POST api tạo người dùng mới là nhân viên tổng đài http://localhost:port/api/nguoidung
router.post("/", nguoidungController.addNguoiDung);

// mở POST api đăng nhập là nhân viên tổng đài http://localhost:port/api/nguoidung/dangnhap
router.post("/dangnhap", nguoidungController.loginNguoiDung);

module.exports = router;