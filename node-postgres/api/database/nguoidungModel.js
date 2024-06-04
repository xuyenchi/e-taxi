const pgPool = require('./database');
const config = require('../../config');
var md5 = require('md5');

const getAllNguoiDung = async () => {
  const result = await pgPool.query("SELECT * FROM nguoidung ORDER BY id ASC");
  return result.rows;
};

const addNguoiDung = async (nguoidung) => {
  try {
    const result = await pgPool.query("INSERT INTO nguoidung (hoten, sodienthoai, matkhau, phanloai) VALUES ($1, $2, $3, $4) RETURNING id", 
    [nguoidung.hoten, nguoidung.sodienthoai, nguoidung.matkhau, nguoidung.phanloai]);
    return result.rows[0].id;
  }
  catch (err) {
    console.log(err);
    return 0;
  }
};

const getAllTaiXe = async (userid, lat, lng) => {
  //console.log(`userid : ${userid}`);
  var sql = "";
  if(userid != 'null') {
    sql = "SELECT * FROM nguoidung WHERE nguoidung.phanloai = 1 AND id !=" + userid + " AND ST_DistanceSphere(ST_MakePoint(lng, lat), ST_MakePoint(" + lng + "," + lat + ")) < " + config.RADIUS 
  }
  else {
    sql = "SELECT * FROM nguoidung WHERE nguoidung.phanloai = 1 AND ST_DistanceSphere(ST_MakePoint(lng, lat), ST_MakePoint(" + lng + "," + lat + ")) < " + config.RADIUS;
  }
  console.log(sql);
  const result = await pgPool.query(sql);
  return result.rows;
};

const loginNguoiDung = async (nguoidung) => {
  //console.log("SELECT id, hoten, sodienthoai FROM nguoidung WHERE sodienthoai = '" + nguoidung.sodienthoai + "' AND matkhau = '" + nguoidung.matkhau + "' AND phanloai = " + nguoidung.phanloai);
  const result = await pgPool.query("SELECT id, hoten, sodienthoai, lat, lng FROM nguoidung WHERE sodienthoai = '" + nguoidung.sodienthoai + "' AND matkhau = '" + nguoidung.matkhau + "' AND phanloai = " + nguoidung.phanloai);
  return result.rows;
};

const updateToaDoNguoiDung = async (id, lat, lng) => {
  try {
    const result = await pgPool.query(
      "UPDATE nguoidung SET lat = $1, lng = $2 WHERE id = $3",
      [lat, lng, id]
    );
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = {
  getAllNguoiDung,
  addNguoiDung,
  loginNguoiDung,
  getAllTaiXe,
  updateToaDoNguoiDung
}