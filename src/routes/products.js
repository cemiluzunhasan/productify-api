const router = require('express').Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  try {
    const product = await Product.find();
    res.send(product);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/:id', (req, res) => {
  const id = req.body.id;

  Product.findOne({_id: id}).then(data => {
    res.status(200).send(data);
  });
});

router.post('/', (req, res) => {
  const product = new Product({ ...req.body });
  product.save().then(data => {
    res.status(200).send(data);
  }).catch(err => {
    res.status(400).send(err);
  })
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  Product.findByIdAndUpdate(id, { ...req.body }, { new: true }).then(data => {
    res.status(200).send(data);
  }).catch(err => {
    res.status(400).send(err);
  });
});

router.delete('/:id', (req, res) => {
  const _id = req.params.id;
  Product.deleteOne({ _id }).then(() => {
    res.status(204).send();
  }).catch(err => {
    res.status(400).send(err);
  })
});

module.exports = router;