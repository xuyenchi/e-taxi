const axios = require('axios');
const CONFIG = require('../config');

// gọi api tới dịch vụ Goong Map để lấy danh sách địa điểm gợi ý theo từ khóa tìm kiếm
const searchDiaDiem = async(textSearch) => {
    return await axios.get('https://rsapi.goong.io/Place/AutoComplete?api_key=' + CONFIG.MAP_API_KEY + '&input=' + textSearch)
    .then(response => {
        //console.log(response.data);
        return response.data;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
};

// gọi api tới dịch vụ Goong Map để tọa độ của 1 địa điểm
const detailDiaDiem = async(placeId) => {
    return await axios.get('https://rsapi.goong.io/Place/Detail?api_key=' + CONFIG.MAP_API_KEY + '&place_id=' + placeId)
    .then(response => {
        //console.log(response.data);
        return response.data;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
};

// gọi api tới dịch vụ Goong Map để lấy địa chỉ theo tọa độ
const searchDiaDiemTheoToaDo = async(lat, lng) => {
    return await axios.get('https://rsapi.goong.io/Geocode?api_key=' + CONFIG.MAP_API_KEY + '&latlng=' + lat + ',' + lng)
    .then(response => {
        //console.log(response.data);
        return response.data;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
};

// gọi api tối API server (node-postgres) để tạo hành trình
const addHanhTrinh = async (hanhtrinh) => {
    return await axios.post(CONFIG.API_URL + '/hanhtrinh', 
        {
            'tenkhachhang' : hanhtrinh.tenkhachhang,
            'sodienthoai' : hanhtrinh.sodienthoai,
            'diachibatdau' : hanhtrinh.diachibatdau,
            'diachiketthuc' : hanhtrinh.diachiketthuc,
            'diemdonlat' : hanhtrinh.diemdonlat,
            'diemdonlng' : hanhtrinh.diemdonlng,
            'diemdenlat' : hanhtrinh.diemdenlat,
            'diemdenlng' : hanhtrinh.diemdenlng,
            'khachhangid' : hanhtrinh.khachhangid
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
    searchDiaDiem,
    detailDiaDiem,
    searchDiaDiemTheoToaDo,
    addHanhTrinh
}