const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    file: {
        type: String 
    }
});

module.exports = mongoose.model('Product', productSchema);
