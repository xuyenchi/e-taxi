const express = require("express");
const nguoidungController = require("../controllers/nguoidungController");

const router = express.Router();

// mở api POST tạo mới người dùng là khách hàng http://localhost:port/api/nguoidung
router.post("/", nguoidungController.addNguoiDung);

// mở api POST đăng nhập người dùng là khách hàng http://localhost:port/api/nguoidung/dangnhap
router.post("/dangnhap", nguoidungController.loginNguoiDung);

module.exports = router;