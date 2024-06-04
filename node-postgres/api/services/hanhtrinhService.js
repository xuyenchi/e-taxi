const hanhtrinhModel = require('../database/hanhtrinhModel')

// tạo hành trình
const addHanhTrinh = async (hanhtrinh) => {
    const result = await hanhtrinhModel.addHanhTrinh(hanhtrinh);
    return result;
};

// lấy tất cả hành trình cho một tổng đài viên
const getAllHanhTrinh = async (nvtongdai) => {
    const hanhtrinh = await hanhtrinhModel.getAllHanhTrinh(nvtongdai);
    return hanhtrinh;
};

// chi tiết hành trình
const detailHanhTrinh = async (hanhtrinhId) => {
    const hanhtrinh = await hanhtrinhModel.detailHanhTrinh(hanhtrinhId);
    return hanhtrinh;
};

// xác nhận hành trình từ tài xế
const nhanHanhTrinh = async (hanhtrinhId, nhanvienId) => {
    const result = await hanhtrinhModel.nhanHanhTrinh(hanhtrinhId, nhanvienId);
    return result;
};

// xác nhận hủy hành trình từ một tài xế
const huyHanhTrinh = async (hanhtrinhId, nhanvienId) => {
    const result = await hanhtrinhModel.huyHanhTrinh(hanhtrinhId, nhanvienId);
    return result;
};

module.exports = {
    addHanhTrinh,
    getAllHanhTrinh,
    detailHanhTrinh,
    nhanHanhTrinh,
    huyHanhTrinh
};