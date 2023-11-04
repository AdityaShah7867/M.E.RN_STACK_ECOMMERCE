const Product = require("../Models/Product");

const addP = async (req, res) => {
    const { name, desc, price } = req.body;

    if (!name || !desc || !price) {
        return res.status(401).json('All values not fulfilled');
    }

    try {
        if (!req.file) {
            return res.status(401).json('No file uploaded');
        }

        console.log(req.file)

        const newProduct = await Product.create({
            name,
            desc,
            price,
            file: req.file.filename
        });

        return res.status(201).json(newProduct);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
const getP = async (req, res) => {
    try {
        const products = await Product.find();

        const productsWithFile = products.map(product => {
            return {
                _id: product._id,
                name: product.name,
                desc: product.desc,
                price: product.price,
                file: product.file 
            };
        });

        res.status(200).json(productsWithFile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteP = async (req, res) => {
    const productId = req.params.id;

    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { addP, getP, deleteP };
