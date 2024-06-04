const hanhtrinhService = require("../services/hanhtrinhService");

// lấy danh sách địa chỉ theo từ khóa tìm kiếm
const searchDiaDiem = async(req, res) => {
    const textSearch = req.query.text;
    //console.log(`tim dia diem : ${textSearch}`)
    const result = await hanhtrinhService.searchDiaDiem(textSearch);
    res.status(200).send(result.predictions);
};

// lấy thông tin tọa độ của 1 địa điểm
const detailDiaDiem = async(req, res) => {
    const placeId = req.query.placeId;
    //console.log(`tim dia diem : ${placeId}`)
    const diadiem = await hanhtrinhService.detailDiaDiem(placeId);
    res.status(200).send(diadiem.result.geometry.location);
};

// tìm kiếm danh sách địa chỉ gợi ý theo tọa độ
const searchDiaDiemTheoToaDo = async(req, res) => {
    const lat = req.query.lat;
    const lng = req.query.lng;
    const result = await hanhtrinhService.searchDiaDiemTheoToaDo(lat, lng);
    //console.log(result);
    res.status(200).send(result);
};

// tạo hành trình cuốc xe
const addHanhTrinh = async (req, res) => {
    const hanhtrinh = req.body;
    console.log(hanhtrinh);
    const result = await hanhtrinhService.addHanhTrinh(hanhtrinh);
    res.status(200).send(result);
};

module.exports = {
    searchDiaDiem,
    detailDiaDiem,
    addHanhTrinh,
    searchDiaDiemTheoToaDo
}