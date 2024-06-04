const axios = require('axios');
const CONFIG = require('../config');
var md5 = require('md5');

// gọi api tới server API (node-postgres) để thêm người dùng là nhân viên taxi
const addNguoiDung = async (nguoidung) => {
    console.log(nguoidung);
    return await axios.post(CONFIG.API_URL + '/nguoidung', 
        {
            'hoten' : nguoidung.hoten,
            'sodienthoai' : nguoidung.sodienthoai,
            'matkhau' : md5(nguoidung.matkhau),
            'phanloai' : 1 // 1 chính là nhân viên TAXI
        })
        .then(response => { 
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
};

// gọi api tới server API (node-postgres) để đăng nhập người dùng là nhân viên taxi
const loginNguoiDung = async (nguoidung) => {
    console.log(nguoidung);
    return await axios.post(CONFIG.API_URL + '/nguoidung/dangnhap', 
        {
            'sodienthoai' : nguoidung.sodienthoai,
            'matkhau' : md5(nguoidung.matkhau),
            'phanloai' : 1 // 1 chính là nhân viên TAXI
        })
        .then(response => { 
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
};

// gọi api tới server API (node-postgres) để cập nhật tọa độ của nhân viên taxi
const updateToaDoNguoiDung = async (userid, lat, lng) => {
    return await axios.put(CONFIG.API_URL + '/nguoidung/capnhattoato', 
        {
            'userid' : userid,
            'lat' : lat,
            'lng' : lng
        })
        .then(response => { 
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
};

module.exports = {
    addNguoiDung,
    loginNguoiDung,
    updateToaDoNguoiDung
}