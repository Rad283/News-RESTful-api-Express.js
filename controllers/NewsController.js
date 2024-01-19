// import Model News

const News = require("../models/News");

// buat class NewsController
class NewsController {
  // buat fungsi

  async index(req, res) {
    // menampilkan data news
    const news = await News.all();

    if (news.lenght == undefined) {
      const data = {
        message: "data news kosong"
      };

      res.status(404).json(data);
    }
    else {
      const data = {
        message: "Menampilkan data news",
        data: news
      };

      res.status(200).json(data);
    }

  }



  async store(req, res) {
    /**
     *  2: memanggil method create.
     * Method create mengembalikan data yang baru diinsert.
     * Mengembalikan response dalam bentuk json.
     */
    // destructing object req. body
    const { title, author, content, url, url_image, published_at, category } = req.body;
    // jika data undefined maka kirim response error
    if (!title || !author || !content || !url || !url_image || !published_at || !category) {
      const data = {
        message: "Semua data harus dikirim",
      }
      return res.status(422).json(data);
    }

    const news = await News.create(req.body);
    const data = {
      message: "Menambahkan data news",
      data: news,
    };

    res.status(201).json(data);
  }


  async update(req, res) {
    /**
     * check id news
     * jika ada, lakukan update
     * jika tidak, kirim data tidak ada
     */
    const { id } = req.params;

    const news = await News.find(id);

    if (news) {
      // update data
      const newsUpdated = await News.update(id, req.body);
      const data = {
        message: "Mengupdate data news",
        data: newsUpdated,
      };

      res.status(200).json(data);
    }
    else {
      // kirim data tidak ada
      const data = {
        message: "Data tidak ada",
      };

      res.status(404).json(data);
    }



  }

  async destroy(req, res) {
    const { id } = req.params;

    /**
     * cari id
     * jika ada, hapus data
     * jika tidak, kirim data tidak ada
     */

    const news = await News.find(id);

    if (news) {
      // hapus data
      await News.delete(id);
      const data = {
        message: "Menghapus data news",
      };

      res.status(200).json(data);
    }
    else {
      // data tidak ada
      const data = {
        message: "Data tidak ada",
      };

      res.status(404).json(data);
    }
  }

  async show(req, res) {
    /**
     * cari id
     * jika ada, kirim datanya
     * jika tidak, kirim data tidak ada
     */
    const { id } = req.params;

    const news = await News.find(id);

    if (news) {
      const data = {
        message: "Menampilkan detail data news",
        data: news,
      };

      res.status(200).json(data);
    }
    else {
      const data = {
        message: "Data tidak ada",
      };

      res.status(404).json(data);
    }

  }

  async search(req, res) {
    /**
     * cari id
     * jika ada, kirim datanya
     * jika tidak, kirim data tidak ada
     */
    const { title } = req.params;

    const news = await News.search(title);

    if (news) {
      const data = {
        message: `Menampilkan pencarian title news`,
        data: news,
      };

      res.status(200).json(data);
    }
    else {
      const data = {
        message: "Data tidak ada",
      };

      res.status(404).json(data);
    }

  }


  async findByCategory(req, res) {
    /**
     * cari id
     * jika ada, kirim datanya
     * jika tidak, kirim data tidak ada
     */
    const { title } = req.params;

    const news = await News.findByCategory(title);

    if (news) {
      const data = {
        message: `Menampilkan pencarian kategory ${title} news`,
        data: news,
      };

      res.status(200).json(data);
    }
    else {
      const data = {
        message: "Data tidak ada",
      };

      res.status(404).json(data);
    }

  }
}

// membuat object NewsController
const object = new NewsController();

// export object NewsController
module.exports = object;
