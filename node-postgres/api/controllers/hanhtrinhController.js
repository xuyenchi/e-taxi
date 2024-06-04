const hanhtrinhService = require("../services/hanhtrinhService");

// api tạo hành trình xe
const addHanhTrinh = async (req, res) => {
    const hanhtrinh = req.body;
    console.log(`addHanhTrinh : ${hanhtrinh}`);
    const result = await hanhtrinhService.addHanhTrinh(hanhtrinh);
    if(result > 0) {
        res.status(200).send({'status' : true, 'data' : result});
    }
    else {
        res.status(200).send({'status' : false, 'data' : null});
    }
};

// api lấy tất cả hành trình của một tổng đài viên
const getAllHanhTrinh = async (req, res) => {
    // lấy thông tin id của tổng đài viên
    const nvtongdai = req.query.nvtongdai;

    // gọi service để lấy hành trình do tổng đài viên tạo ra
    const hanhtrinh = await hanhtrinhService.getAllHanhTrinh(nvtongdai);
    res.status(200).send({'status' : true, 'data' : hanhtrinh});
};

// lấy thông tin chi tiết của một hành trình xe
const detailHanhTrinh = async (req, res) => {
    // lấy thôn tin id của hành trình
    const hanhtrinhId = req.query.hanhtrinhId;

    // gọi service lấy thông tin chi tiết của hành trình theo hanh trinh id
    const hanhtrinh = await hanhtrinhService.detailHanhTrinh(hanhtrinhId);
    res.status(200).send({'status' : true, 'data' : hanhtrinh});
};

// xác nhận hành trình từ tài xế 
const nhanHanhTrinh = async (req, res) => {
    // lấy thông tin hành trình id và nhân viên id
    const { hanhtrinhId, nhanvienId } = req.body;

    // gọi service xác nhận cuốc xe từ tài xế
    const result = await hanhtrinhService.nhanHanhTrinh(hanhtrinhId, nhanvienId);
    res.status(200).send({'status' : result});
};

// xác nhận hủy hành trình từ tài xế
const huyHanhTrinh = async (req, res) => {
    // lấy thông tin hành trình id và nhân viên id
    const { hanhtrinhId, nhanvienId } = req.body;

    // gọi service xác nhận hủy cuốc xe từ tài xế
    const result = await hanhtrinhService.huyHanhTrinh(hanhtrinhId, nhanvienId);
    res.status(200).send({'status' : result});
};

module.exports = {
    addHanhTrinh,
    getAllHanhTrinh,
    detailHanhTrinh,
    nhanHanhTrinh,
    huyHanhTrinh
};