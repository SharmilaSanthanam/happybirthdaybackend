const router = require('express').Router();
let Audio = require('../models/productModel.js');

// route to get all
router.route('/').get((req, res) => {
  Audio.find()
    .then(audios => res.json(audios))
    .catch(err => res.status(400).json('Error: ' + err));
});

// route to add new
router.route('/add').post((req, res) => {
  const product = req.body.product;
  const filepath = req.body.filepath;
//   const question = req.body.question;

  const newAudio = new Audio({
    product,
    filepath,
    // question,
  });

  newAudio.save()
    .then(() => res.json('Audio added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// route to get by id
router.route('/:id').get((req, res) => {
  Audio.findById(req.params.id)
    .then(audio => res.json(audio))
    .catch(err => res.status(400).json('Error: ' + err));
});

// route to delete by id
router.route('/:id').delete((req, res) => {
  Audio.findByIdAndDelete(req.params.id)
    .then(() => res.json('Audio deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// route to update by id
router.route('/update/:id').post((req, res) => {
  Audio.findById(req.params.id)
    .then(audio => {
      audio.product = req.body.product;
      audio.filepath = req.body.filepath;
    //   audio.question = req.body.question;

      audio.save()
        .then(() => res.json('Audio updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;