const nguoidungModel = require('../database/nguoidungModel')

// lấy tất cả người dùng
const getAllNguoiDung = async () => {
    const nguoidung = await nguoidungModel.getAllNguoiDung();
    return nguoidung;
};

// tạo người dùng mới
const addNguoiDung = async (nguoidung) => {
    const id = await nguoidungModel.addNguoiDung(nguoidung);
    return id;
};

// thực hiện login
const loginNguoiDung = async (nguoidung) => {
    const result = await nguoidungModel.loginNguoiDung(nguoidung);
    return result;
};

// lấy thông tin tất cả tài xế xe khà dụng trong bán kính R
const getAllTaiXe = async (userid, lat, lng) => {
    const taixe = await nguoidungModel.getAllTaiXe(userid, lat, lng);
    return taixe;
};

// cập nhật tọa độ tài xế
const updateToaDoNguoiDung = async (userid, lat, lng) => {
    const result = await nguoidungModel.updateToaDoNguoiDung(userid, lat, lng);
    return result;
};

module.exports = {
    getAllNguoiDung,
    addNguoiDung,
    loginNguoiDung,
    getAllTaiXe,
    updateToaDoNguoiDung
};