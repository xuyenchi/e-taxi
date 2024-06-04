const axios = require('axios');
const CONFIG = require('../config');

// gọi api tới API server (node-postgres) để lấy thông tin hành trình của 1 nhân viên tổng đài
const getAllHanhTrinh = async (nvtongdai) => {
    //console.log(CONFIG.API_URL + '/hanhtrinh');
    return await axios.get(CONFIG.API_URL + '/hanhtrinh?nvtongdai=' + nvtongdai)
     .then(response => { 
        return response.data;
     })
     .catch(error => {
         console.error('Error fetching data:', error);
     });
};

// gọi api tới API server (node-postgres) để tạo một hành trình mới từ thông tin cuộc gọi
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
            'nvtongdai' : hanhtrinh.nvtongdai
        })
        .then(response => { 
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
};

// gọi api tới dịch vụ Goong Map để lấy danh sách địa chỉ gợi ý theo từ khóa
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

// gọi api tới dịch vụ Goong Map để lấy danh sách địa chỉ gợi ý theo từ khóa
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

module.exports = {
    getAllHanhTrinh,
    addHanhTrinh,
    searchDiaDiem,
    detailDiaDiem
}