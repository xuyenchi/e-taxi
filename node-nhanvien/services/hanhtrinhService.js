const axios = require('axios');
const CONFIG = require('../config');

// tài xế taxi nhận hành trình
const nhanHanhTrinh = async (hanhtrinh) => {
    // gọi api tới server API (node-postgres) để xác nhận hành trình
    return await axios.put(CONFIG.API_URL + '/hanhtrinh/nhan', 
        {
            'hanhtrinhId' : hanhtrinh.hanhtrinhId,
            'nhanvienId' : hanhtrinh.nhanvienId,
        })
        .then(response => { 
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
};

// nhân viên taxi hủy hành trình
const huyHanhTrinh = async (hanhtrinh) => {
    // gọi api tới server API (node-postgres) để hủy nhận hành trình
    return await axios.put(CONFIG.API_URL + '/hanhtrinh/huy', 
        {
            'hanhtrinhId' : hanhtrinh.hanhtrinhId,
            'nhanvienId' : hanhtrinh.nhanvienId,
        })
        .then(response => { 
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
};

// gọi api tới dịch vụ Goong Map để tìm danh sách địa chỉ theo từ khóa
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

// gọi api tới dịch vụ Goong Map để tìm tọa độ cho địa điểm
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

// gọi api tới dịch vụ Goong Map để đường đi 
const directionDuongDi = async(startlat, startlng, endlat, endlng) => {
    return await axios.get('https://rsapi.goong.io/Direction?api_key=' + CONFIG.MAP_API_KEY + '&origin=' + startlat + ',' + startlng + '&destination=' + endlat + ',' + endlng)
    .then(response => {
        //console.log(response.data);
        return response.data;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
};

module.exports = {
    nhanHanhTrinh,
    huyHanhTrinh,
    searchDiaDiem,
    detailDiaDiem,
    directionDuongDi
}