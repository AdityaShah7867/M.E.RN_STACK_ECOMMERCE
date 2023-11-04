const express = require('express');
const { addToCart, fetchCartByUser, deleteFromCart, updateCart } = require('../Controller/Cart');
const multer = require('../Middleware/Multer');
const { verifyToken } = require('../Middleware/VerifyUser');
const router = express.Router();

router.post('/:pid',verifyToken, addToCart)
      .get('/',verifyToken, fetchCartByUser)
      .delete('/:id', deleteFromCart)
      .patch('/:id', updateCart)


module.exports = router;