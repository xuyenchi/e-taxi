const nguoidungService = require("../services/nguoidungService");

// tạo người dùng mới là khách hàng
const addNguoiDung = async (req, res) => {
    const nguoidung = req.body;
    const result = await nguoidungService.addNguoiDung(nguoidung);
    res.status(200).send(result);
};

// đăng nhập người dùng mới là khách hàng
const loginNguoiDung = async (req, res) => {
    const nguoidung = req.body;
    const result = await nguoidungService.loginNguoiDung(nguoidung);
    
    if(result.data) {
        // lưu thông tin user vào session sau khi đăng nhập thành công
        req.session.user = result.data;
        req.session.save();
        console.log('lưu trữ user vào session');
        //console.log(req.session.user);
    }
    res.status(200).send(result);
};

module.exports = {
    addNguoiDung,
    loginNguoiDung
}