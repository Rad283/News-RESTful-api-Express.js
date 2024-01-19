// import database
const db = require("../config/database");

// membuat class News
class News {
  // buat fungsi
  static all() {
    return new Promise((resolve, reject) => {
      // lakukan query ke db untuk ambil data
      const sql = "SELECT * FROM news";
      db.query(sql, (sql, results) => {
        resolve(results);
      });
    });
  }

  /**
* TODO 1: Buat fungsi untuk insert data.
* Method menerima parameter data yang akan diinsert.
* Method mengembalikan data news yang baru diinsert.
*/

  // promise 1
  static async create(news) {
    const id = await new Promise((resolve, reject) => {
      const sql = "INSERT INTO news SET ?";
      db.query(sql, news, (err, results) => {
        resolve(results.insertId);
      });
    });


    // promise 2
    const hasil = this.find(id);
    return hasil
  }


  static find(id) {
    // lakukan promise, select by id
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM news WHERE id = ?`;
      db.query(sql, id, (err, results) => {
        resolve(results[0]);
      });
    });
  }

  static async update(id, data) {
    // update data
    await new Promise((resolve, reject) => {
      // query untuk update data
      const sql = "UPDATE news SET ? WHERE id = ?";
      db.query(sql, [data, id], (err, results) => {
        resolve(results);
      });
    });

    // select data by id
    const news = await this.find(id);
    return news;
  }

  static async delete(id) {
    // query delete
    return new Promise((resolve, reject) => {
      // query sql
      const sql = "DELETE FROM news WHERE id = ?";
      db.query(sql, id, (err, results) => {
        resolve(results);
      });
    });
  }


  static search(title) {
    // lakukan promise, select by id
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM news WHERE title = ?`;
      db.query(sql, title, (err, results) => {
        resolve(results[0]);
      });
    });
  }

  static findByCategory(title) {
    // lakukan promise, select by id
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM news WHERE category = ?`;
      db.query(sql, title, (err, results) => {
        resolve(results[0]);
      });
    });
  }



}

// export class News
module.exports = News;
