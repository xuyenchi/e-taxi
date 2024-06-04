const pgPool = require("./database");

const addHanhTrinh = async (hanhtrinh) => {
  try {
    console.log(hanhtrinh);
    let nvtongdai = null;
    if (hanhtrinh?.nvtongdai !== undefined) {
      nvtongdai = hanhtrinh.nvtongdai;
    }

    let khachhangid = null;
    if (hanhtrinh?.khachhangid !== undefined) {
      khachhangid = hanhtrinh.khachhangid;
    }

    const result = await pgPool.query(
      "INSERT INTO hanhtrinh (tenkhachhang, sodienthoai, diachibatdau, diachiketthuc, diemdonlat, diemdonlng, diemdenlat, diemdenlng, nvtongdai, khachhangid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id",
      [
        hanhtrinh.tenkhachhang,
        hanhtrinh.sodienthoai,
        hanhtrinh.diachibatdau,
        hanhtrinh.diachiketthuc,
        hanhtrinh.diemdonlat,
        hanhtrinh.diemdonlng,
        hanhtrinh.diemdenlat,
        hanhtrinh.diemdenlng,
        nvtongdai,
        khachhangid
      ]
    );
    return result.rows[0].id;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

const getAllHanhTrinh = async (nvtongdai) => {
  let sql = "SELECT hanhtrinh.tenkhachhang, hanhtrinh.sodienthoai as dienthoaikhachhang ,";
  sql += " hanhtrinh.diachibatdau, hanhtrinh.diachiketthuc, hanhtrinh.tinhtrang, nguoidung.hoten as tennhanvien, nguoidung.sodienthoai as dienthoainhanvien";
  sql += " FROM hanhtrinh LEFT JOIN nguoidung ON hanhtrinh.nhanvienid = nguoidung.id";
  //sql += " WHERE nvtongdai = " + nvtongdai + " ORDER BY hanhtrinh.id DESC";
  const result = await pgPool.query(sql);
  return result.rows;
};

const detailHanhTrinh = async (hanhtrinhId) => {
  const result = await pgPool.query("SELECT * FROM hanhtrinh WHERE id = " + hanhtrinhId);
  return result.rows;
};

const nhanHanhTrinh = async (hanhtrinhId, nhanvienId) => {
  try {
    console.log(`hanh trinh id : ${hanhtrinhId}`);
    console.log(`nhan vien id : ${nhanvienId}`);
    const result = await pgPool.query(
      "UPDATE hanhtrinh SET nhanvienid = $1, tinhtrang = $2 WHERE id = $3",
      [nhanvienId, 1, hanhtrinhId]
    );
    return true;
  } catch (err) {
    return false;
  }
};

const huyHanhTrinh = async (hanhtrinhId, nhanvienId) => {
  try {
    const result = await pgPool.query(
      "UPDATE hanhtrinh SET nhanvienid = $1, tinhtrang = $2, nvhuychuyen = $3 WHERE id = $4",
      [null, 2, nhanvienId, hanhtrinhId]
    );
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = {
  addHanhTrinh,
  getAllHanhTrinh,
  detailHanhTrinh,
  nhanHanhTrinh,
  huyHanhTrinh,
};
