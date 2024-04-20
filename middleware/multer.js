import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        const fileExt = file.originalname.split(".");
        const ext = "." + fileExt.splice(fileExt.lastIndexOf("."));
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

export const upload = multer({ storage })