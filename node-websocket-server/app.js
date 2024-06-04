// Importing the required modules
const axios = require('axios');
const CONFIG = require('./config');
const WebSocketServer = require('ws');

// tạo map lưu trữ thông tin websoket
// key : người dùng id; value : websocket client
let clients = new Map();
 
// khởi tạo websocket server với port 8080
const wss = new WebSocketServer.Server({ port: CONFIG.PORT })
 
// Khởi tạo kết nối client <--> server
wss.on("connection", ws => {
    console.log("Có client mới kết nối");

    // hứng thông tin từ các client
    ws.on("message", messages => {
        console.log("Thông tin từ client");
        
        // chuyển đổi messages của client qua dạng json
        var obj = JSON.parse(messages);

        // lấy loại của message, và thông tin id người dùng nào gửi tới
        var type = obj.type;
        var userid = obj.userid;

        // nếu thông điệp là đăng ký nhận gửi data với server
        if(type === 'register') {
            // lưu trữ thông tin client vào map clients
            clients.set(userid, ws);
            console.log(`Đăng ký client mới từ người dùng có id : ${userid}`);
        }
        // nếu thông điệp báo có cuốc xe mới (từ khách hàng hay tổng đài viên), hoặc thông điệp hủy hành trình từ tài xế xe
        // thực hiện tìm ra danh sách tài xế trong bán kính R là báo thông tin cho các tài xế đó
        else if(type == 'cuocxemoi' || type == 'huyhanhtrinh') {
            // lấy id của hành trình cần tìm tài xế
            var hanhtrinhId = obj.data.hanhtrinhid;

            // gọi api lấy thông tin chi tiết của hành trình
            axios.get(CONFIG.API_URL + '/hanhtrinh/chitiet?hanhtrinhId=' + hanhtrinhId)
                .then(response => { 
                    var result = response.data;
                    if(result.status === true) {
                        var hanhtrinh = result.data[0];
                        // kiểm tra hành trình chưa có tài xế nhận
                        if(hanhtrinh.tinhtrang == 0) {
                            // tìm ra danh sách tài xế khả dụng trong bán kính R
                            axios.get(CONFIG.API_URL + '/nguoidung/timtaixe?lat=' + hanhtrinh.diemdonlat + '&lng=' + hanhtrinh.diemdonlng + '&userid=' + hanhtrinh.nvhuychuyen)
                            .then(response => { 
                                result = response.data;
                                if(result.status === true) {
                                    var listTaiXe = result.data
                                    // vòng lặp để báo cho các tài xế khả dụng
                                    listTaiXe.forEach(function(taixe) {
                                        var userid = parseInt(taixe.id);
                                        var client = clients.get(userid);
                                        // gửi thông tin cho các tài xế đang ONLINE trên ứng dụng
                                        if(typeof client !== 'undefined') {
                                            console.log(`gửi thông tin cho tài xế ${taixe.id}`);
                                            client.send(JSON.stringify(hanhtrinh));
                                        }
                                    });
                                }
                            })
                            .catch(error => {
                                console.error('Error fetching data:', error);
                            });
                        }
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
        // nếu thông điệp từ tài xế xác nhận hành trình
        else if(type == 'nhanhanhtrinh') {
            var hanhtrinh = obj.data.hanhtrinh;

            // hành trình do khách hàng đặt qua APP
            if(hanhtrinh.khachhangid !== null) {
                khachhangid = parseInt(hanhtrinh.khachhangid);
                console.log(`nhân viên ${userid} nhận hành trình ${hanhtrinh.id} của khách hàng ${khachhangid}`);
            
                // thông báo cho khách hàng dùng APP
                var client = clients.get(khachhangid);
                if(typeof client !== 'undefined') {
                    console.log(`gửi thông tin cho khách hàng ${khachhangid}`);
                    client.send(JSON.stringify({'type' : 'cotaixe', 'data' : hanhtrinh}));
                }
            }
            // thông báo SMS cho khách hàng, và báo lại với nhân viên tổng đài
            else {
                console.log(`nhân viên ${userid} nhận hành trình ${hanhtrinh.id} của khách hàng từ tổng đài`);
                console.log(`gửi thông báo SMS tới cho khách hàng có số điện thoại : ${hanhtrinh.sodienthoai}`);
                var client = clients.get(parseInt(hanhtrinh.nvtongdai));
                if(typeof client !== 'undefined') {
                    console.log(`gửi thông tin nhân viên tổng đài ${hanhtrinh.nvtongdai}`);
                    client.send(JSON.stringify(hanhtrinh));
                }
            }
        }
        // nếu thông điệp từ tài xế báo bắt đầu di chuyển đón khách
        // cập nhật tọa độ tài xế cho khách hàng để theo dõi tài xế di chuyển trên bản đồ
        else if(type == 'dichuyen') {
            //console.log(obj.data);
            var khachhangid = obj.data.khachhangid;
            var lat = obj.data.lat;
            var lng = obj.data.lng;
            // thông báo tọa độ của tài xế cho khách hàng dùng APP
            if(khachhangid !== null) {
                var client = clients.get(parseInt(khachhangid));
                if(typeof client !== 'undefined') {
                    console.log(`gửi thông tin cho khách hàng ${khachhangid}`);
                    client.send(JSON.stringify({'type' : 'toado', 'data' : {'lat' : lat, 'lng' : lng}}));
                }
            }
        }
    });
 
    // handling what to do when clients disconnects from server
    ws.on("close", () => {
        console.log("client ngắt kết nối");
        // xóa thông tin client ra khỏi map clients
        for (const [key, value] of clients) {
            if (value === ws) {
                clients.delete(key);
                break;
            }
        }
    });
    // handling client connection error
    ws.onerror = function () {
        console.log("Some Error occurred")
    }
});
console.log("The WebSocket server is running on port 8080");