const multer = require('multer');
const path = require('path');

// Define storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Define the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        cb(null, uniqueSuffix + fileExtension); // Define how the file will be named
    }
});

// Define file filter to allow specific file types
const fileFilter = (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif']; // Example: Allow only images
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and GIF images are allowed.'));
    }
};

// Initialize multer with defined storage and file filter
const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
