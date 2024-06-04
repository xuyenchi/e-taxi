const nguoidungService = require("../services/nguoidungService");

// lấy thông tin tất cả người dùng
const getAllNguoiDung = async (req, res) => {
    // gọi srevice lấy tất cả thông tin của người dùng
    const nguoidung = await nguoidungService.getAllNguoiDung();
    res.status(200).send({'status' : true, 'data' : nguoidung});
};

// tạo người dùng mới
const addNguoiDung = async (req, res) => {
    // lấy thông tin người dùng từ body
    const nguoidung = req.body;

    // gọi service tạo người dùng mới và trả ra id của người dùng mới tạo
    const id = await nguoidungService.addNguoiDung(nguoidung);
    if(id > 0) {
        res.status(200).send({'status' : true, 'data' : id});
    }
    else {
        res.status(200).send({'status' : false, 'data' : null});
    }
};

// thực hiện đăng nhập
const loginNguoiDung = async (req, res) => {
    // lấy thông tin đăng nhập
    const nguoidung = req.body;

    // gọi service thục hiện đăng nhập, và trả ra thông tin người dùng
    const result = await nguoidungService.loginNguoiDung(nguoidung);
    if(Array.isArray(result) && result.length > 0) {
        res.status(200).send({'status' : true, 'data' : result[0]});
    }
    else {
        res.status(200).send({'status' : false, 'data' : {}});
    }
};

// lấy tất cả tài xế trong phạm vi bán kính R, tính theo tọa độ đón khách hàng
const getAllTaiXe = async (req, res) => {
    // lấy thông tin tài xế đả hủy chuyến, để loại trừ
    const userid = req.query.userid;
    // lấy thông tin tọa độ  đón khách
    const lat = req.query.lat;
    const lng = req.query.lng;

    // gọi service lấy thông tin tất cả các tài xế khả dụng trong bán kính R
    const result = await nguoidungService.getAllTaiXe(userid, lat, lng);
    if(Array.isArray(result) && result.length > 0) {
        res.status(200).send({'status' : true, 'data' : result});
    }
    else {
        res.status(200).send({'status' : false, 'data' : {}});
    }
};

// cập nhật tọa độ hiện tại của tài xế
const updateToaDoNguoiDung = async (req, res) => {
    // lấy thông tin id , tọa độ của tài xế
    const data = req.body;

    // gọi service cập nhật tọa độ
    const result = await nguoidungService.updateToaDoNguoiDung(data.userid, data.lat, data.lng);
    res.status(200).send({'status' : result});
};
  
module.exports = {
    getAllNguoiDung,
    addNguoiDung,
    loginNguoiDung,
    getAllTaiXe,
    updateToaDoNguoiDung
};