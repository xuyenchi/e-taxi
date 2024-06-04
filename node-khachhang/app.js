const express = require('express');
const session = require('express-session');
const cookieParser = require("cookie-parser");
var bodyParser = require('body-parser');
const CONFIG = require('./config');

const app = express();

const port = CONFIG.PORT;

// khởi tạo session
app.use(cookieParser());
app.use(session({
    secret: 'etaxi-d1bd9fd54a2fed6058f74ed35bb45a45',
    name : 'etaxi-tongdai',
    saveUninitialized: true,
	resave: false,
    cookie: {
        secure: false, // dùng cho http
        maxAge: 24 * 60 * 60 * 1000 // thời gian hết hạn là 1 ngày
    }
}));

// dùng data session cho template (các file trong view)
app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    next();
  });

// kiểm tra thông tin đăng nhập
function authChecker(req, res, next) {
    // nếu đã đăng nhập hoặc đang vào trang đăng nhập thì cho đi tiếp
    if (req.session.user || req.path==='/dangnhap') {
        next();
    }
    // nếu chưa đăng nhập thì chuyển đển trang đăng nhập 
    else {
       res.redirect("/dangnhap");
    }
}

// parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// sử dụng đường dẫn static cho them adminlte
app.use('/static', express.static('public/adminlte'));
// sử dụng đường dẫn jquerylib cho jqueryui 
app.use('/jquerylib', express.static('public/jquery-ui-1.13.2.custom'));

// tạo đường dẫn cho api hành trình và api người dùng
const hanhtrinhRoutes = require("./routes/hanhtrinhRoutes");
app.use("/api/hanhtrinh", hanhtrinhRoutes);
const nguoidungRoutes = require("./routes/nguoidungRoutes");
app.use("/api/nguoidung", nguoidungRoutes);

// sử dụng EJS cho template engine
app.set('view engine', 'ejs');

// trang chủ
app.get('/', authChecker, (req, res) => {
    //console.log('kiểm tra login');
    //console.log(req.session);
    if(req.session.user) {
        // nếu đẵ đăng nhập -> vào trang index
        res.render('index', { ws_url : CONFIG.WS_URL, map_key : CONFIG.MAP_KEY, map_api_key : CONFIG.MAP_API_KEY });
    }
    else {
        // nếu chưa đăng nhập -> vào trang login
        res.render('login', {});
    }
});

// đăng ký
app.get('/dangky', (req, res) => { 
    req.session.destroy();
    res.render('register', {});
});

// đăng nhập
app.get('/dangnhap', (req, res) => {
    req.session.destroy();
    res.render('login', {});
});

// thoát ứng dụng
app.get('/thoat', (req, res) => { 
    req.session.destroy();
    res.render('login', {});
});

app.listen(port, () => {
    console.log(`server sucessful started on port ${port}`);
});



