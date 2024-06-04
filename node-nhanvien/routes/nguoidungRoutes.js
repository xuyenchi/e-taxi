const express = require("express");
const nguoidungController = require("../controllers/nguoidungController");

const router = express.Router();

// mở POST api thêm người dùng là nhân viên taxi http://localhost:port/api/nguoidung
router.post("/", nguoidungController.addNguoiDung);

// mở POST api đăng nhập người dùng là nhân viên taxi http://localhost:port/api/nguoidung/dangnhap
router.post("/dangnhap", nguoidungController.loginNguoiDung);

// mở POST api cập nhật tọa độ của nhân viên taxi http://localhost:port/api/nguoidung/capnhattoato
router.put("/capnhattoato", nguoidungController.updateToaDoNguoiDung);

module.exports = router;