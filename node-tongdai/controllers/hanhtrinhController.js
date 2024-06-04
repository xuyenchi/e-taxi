const hanhtrinhService = require("../services/hanhtrinhService");

// lấy tất cả thông tin hành trình của nhân viên tổng đài
const getAllHanhTrinh = async (req, res) => {
    const nvtongdai = req.query.nvtongdai;
    const hanhtrinh = await hanhtrinhService.getAllHanhTrinh(nvtongdai);
    res.status(200).send(hanhtrinh);
};

// thêm hành trình mới từ thông tin cuộc gọi
const addHanhTrinh = async (req, res) => {
    const hanhtrinh = req.body;
    //console.log(hanhtrinh);
    const result = await hanhtrinhService.addHanhTrinh(hanhtrinh);
    res.status(200).send(result);
};

// tìm danh sách địa chỉ theo từ khóa tìm kiếm
const searchDiaDiem = async(req, res) => {
    const textSearch = req.query.text;
    //console.log(`tim dia diem : ${textSearch}`)
    const result = await hanhtrinhService.searchDiaDiem(textSearch);
    res.status(200).send(result.predictions);
};

// lấy thông tin tọa độ của địa điểm
const detailDiaDiem = async(req, res) => {
    const placeId = req.query.placeId;
    //console.log(`tim dia diem : ${placeId}`)
    const diadiem = await hanhtrinhService.detailDiaDiem(placeId);
    res.status(200).send(diadiem.result.geometry.location);
};

module.exports = {
    getAllHanhTrinh,
    addHanhTrinh,
    searchDiaDiem,
    detailDiaDiem
}