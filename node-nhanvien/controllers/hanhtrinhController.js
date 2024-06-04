const hanhtrinhService = require("../services/hanhtrinhService");

// tìm kiếm danh sách địa điểm dựa theo từ khóa tìm kiếm
const searchDiaDiem = async(req, res) => {
    const textSearch = req.query.text;
    //console.log(`tim dia diem : ${textSearch}`)
    const result = await hanhtrinhService.searchDiaDiem(textSearch);
    res.status(200).send(result.predictions);
};

// tìm tọa độ cho địa điểm trên goong map
const detailDiaDiem = async(req, res) => {
    const placeId = req.query.placeId;
    //console.log(`tim dia diem : ${placeId}`)
    const diadiem = await hanhtrinhService.detailDiaDiem(placeId);
    res.status(200).send(diadiem.result.geometry.location);
};

// nhận hành trình
const nhanHanhTrinh = async (req, res) => {
    const hanhtrinh = req.body;
    console.log(hanhtrinh);
    const result = await hanhtrinhService.nhanHanhTrinh(hanhtrinh);
    res.status(200).send(result);
};

// hủy hành trình
const huyHanhTrinh = async (req, res) => {
    const hanhtrinh = req.body;
    //console.log(hanhtrinh);
    const result = await hanhtrinhService.huyHanhTrinh(hanhtrinh);
    res.status(200).send(result);
};

// tìm đường đi từ chỗ tài xế đến điểm đón khách để giả lập taxi chạy trên bản đồ
const directionDuongDi = async (req, res) => {
    const startlat = req.query.startlat;
    const startlng = req.query.startlng;
    const endlat = req.query.endlat;
    const endlng = req.query.endlng;
    const result = await hanhtrinhService.directionDuongDi(startlat, startlng, endlat, endlng);
    res.status(200).send(result);
};

module.exports = {
    searchDiaDiem,
    detailDiaDiem,
    nhanHanhTrinh,
    huyHanhTrinh,
    directionDuongDi
}