const cloudinary = require('cloudinary').v2;
const fs = require('fs');

exports.cloudUpload = async (file) => {
    const result = await cloudinary.uploader.upload(file.path,
        { folder: file.fieldname === "profileImg" ? "/novel/profile" : file.fieldname === "coverImg" ? "/novel/cover" : "/novel/other" },
        (error, result) => {
            if (error) throw new Error(error);
            fs.unlinkSync(file.path);
        }
    );
    return result.secure_url;
};

exports.cloudDelete = (url) => {
    const publicId = `${url.split('/')[7]}/${url.split('/')[8]}/${(url.split('/')[9]).split('.')[0]}`;
    cloudinary.uploader.destroy(publicId, async (error, result) => { if (error) throw new Error(error); });
};