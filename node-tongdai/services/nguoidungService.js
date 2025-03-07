const axios = require('axios');
const CONFIG = require('../config');
var md5 = require('md5');

// gọi api tới API server (node-postgres) để tạo người dùng mới là nhân viên tổng đài
const addNguoiDung = async (nguoidung) => {
    console.log(nguoidung);
    return await axios.post(CONFIG.API_URL + '/nguoidung', 
        {
            'hoten' : nguoidung.hoten,
            'sodienthoai' : nguoidung.sodienthoai,
            'matkhau' : md5(nguoidung.matkhau),
            'phanloai' : 0
        })
        .then(response => { 
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
};

// gọi api tới API server (node-postgres) để đăng nhập người dùng là nhân viên tổng đài
const loginNguoiDung = async (nguoidung) => {
    console.log(nguoidung);
    return await axios.post(CONFIG.API_URL + '/nguoidung/dangnhap', 
        {
            'sodienthoai' : nguoidung.sodienthoai,
            'matkhau' : md5(nguoidung.matkhau),
            'phanloai' : 0
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
    loginNguoiDung
}