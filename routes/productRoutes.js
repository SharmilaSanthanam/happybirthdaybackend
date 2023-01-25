const router = require('express').Router();
const Product = require('../models/productModel');


//get products;
router.get('/', async (req, res) => {
  try {
    const sort = { '_id': -1 }
    const products = await Product.find().sort(sort);
    res.status(200).json(products);
  } catch (e) {
    res.status(400).send(e.message);
    // console.log(e);
  }
})

//create product
router.post('/', async (req, res) => {
  try {
    const { name, word, description, filepath, images: pictures } = req.body;
    const product = await Product.create({ name, word, description, filepath, pictures });
    const products = await Product.find();
    res.status(201).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
})

// update product

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { name, word, description, filepath, images: pictures } = req.body;
    const product = await Product.findByIdAndUpdate(id, { name, word, description, filepath, pictures });
    const products = await Product.find();
    res.status(200).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
})

// delete product

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;
  try {
    const user = await User.findById(user_id);
    if (!user.isAdmin) return res.status(401).json("You don't have permission");
    await Product.findByIdAndDelete(id);
    const products = await Product.find();
    res.status(200).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    const similar = await Product.find({ category: product.category }).limit(5);
    res.status(200).json({ product, similar })
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get('/category/:category', async (req, res) => {
  const { category } = req.params;
  try {
    let products;
    const sort = { '_id': -1 }
    if (category == "all") {
      // products = await Product.find().sort([['date', -1]])
      products = await Product.find().sort(sort);

    } else {
      // products = await Product.find({category})
      products = await Product.find({ category }).sort(sort)
    }
    res.status(200).json(products)
  } catch (e) {
    res.status(400).send(e.message);
  }
})

module.exports = router;