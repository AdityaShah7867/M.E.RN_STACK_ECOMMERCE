const express = require("express");
const router = express.Router();
const multer = require('../Middleware/Multer'); // Import the multer middleware
const { addP, getP, deleteP } = require("../Controller/Product");

router.post('/addP', multer.single('file'), addP); // Use multer middleware for file upload
router.get('/getP', getP);
router.delete('/deleteP/:id', deleteP);

module.exports = router;
