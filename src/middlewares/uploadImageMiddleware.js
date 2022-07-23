const multer = require('multer');
const fs = require('node:fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = './tmp';

    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e3);
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

exports.upload = upload;
