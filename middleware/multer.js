import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        const acceptExt = ['.jpg', '.png', '.jpeg', 'svg'];

        const fileExt = file.originalname.split(".");
        const ext = "." + fileExt.splice(fileExt.lastIndexOf("."));
        console.log(ext);

        if (!acceptExt.includes(ext)) {
            return cb(null, ".false")
        }
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

export const upload = multer({ storage })
