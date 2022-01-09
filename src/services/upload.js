const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}.${file.mimetype.split('/')[1]}`);
    },
});

const upload = multer({
    storage: storage, fileFilter: (req, file, cb) => {
        if (file.mimetype.split('/')[1] === 'jpeg' || file.mimetype.split('/')[1] === 'jpg' || file.mimetype.split('/')[1] === 'png') cb(null, true);
        else cb(new Error('jpg or png only'));
    }
});

module.exports = upload;