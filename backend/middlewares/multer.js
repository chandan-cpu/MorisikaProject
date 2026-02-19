const multer = require("multer");

//use memory storage files will be stored in ram (buffer) instead of disk this is best when uploading directly to cloudenary or any other cloud storage
const storage = multer.memoryStorage();

const upload = multer(
  console.log("Multer Middleware Loaded"), {


  //Storage Engine
  storage,

  //limit file size to 10mb
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },

  //filter which file type are allowed
  fileFilter: (req, file, cb) => {

    //in heare cb is callback function which takes two arguments first is error and second is boolean value if true file will be accepted if false file will be rejected
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
    ];

    if (allowedTypes.includes(file.mimetype)) {
       //MIME-multipurpose Internet Mail Extensions is a standard that indicates the nature and format of a document, file, or assortment of bytes. It is used to identify the type of data being sent over the internet.
      cb(null, true);
    } else {
      cb(new Error("Only Images & PDF allowed"), false);
    }
  },
});

module.exports = upload;