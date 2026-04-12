import multer from "multer";

const storage = multer.memoryStorage();
// export const singleUpload = multer({storage}).single("file");
export const upload = multer({ storage }).fields([
    { name: "file", maxCount: 1 },           // resume
    { name: "profilePhoto", maxCount: 1 }    // profile image
]);