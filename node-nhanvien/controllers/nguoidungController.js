const nguoidungService = require("../services/nguoidungService");

// thêm mới nhân viên taxi
const addNguoiDung = async (req, res) => {
    const nguoidung = req.body;
    const result = await nguoidungService.addNguoiDung(nguoidung);
    res.status(200).send(result);
};

// login nhân viên taxi
const loginNguoiDung = async (req, res) => {
    const nguoidung = req.body;
    const result = await nguoidungService.loginNguoiDung(nguoidung);
    // lưu trữ thông tin người dùng vào session sau khi login thành công
    if(result.data) {
        // lưu thông tin user vào session
        req.session.user = result.data;
        req.session.save();
        //console.log('lưu trữ user vào session');
        //console.log(req.session.user);
    }
    res.status(200).send(result);
};

// cập nhật tọa độ của nhân viên taxi
const updateToaDoNguoiDung = async (req, res) => {
    const data = req.body;
    const result = await nguoidungService.updateToaDoNguoiDung(data.userid, data.lat, data.lng);
    res.status(200).send(result);
};

module.exports = {
    addNguoiDung,
    loginNguoiDung,
    updateToaDoNguoiDung
}