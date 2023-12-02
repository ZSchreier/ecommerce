
// The comments here were provided with the starter code. I have left them in here to show the information I was given to work off of to achieve product completion

const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
// be sure to include its associated Products
router.get('/', async (req, res) => {
  try {
    const payload = await Category.findAll({
      include: [{model: Product}]
    });
    res.status(200).json({status: 'success', sendback: payload})
  } catch (err){
    res.status(500).json({status: 'error', sendback: err.message})
  }
});

// find one category by its `id` value
// be sure to include its associated Products
router.get('/:id', async (req, res) => {
  try {
    const payload = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    res.status(200).json({status: 'success', sendback: payload})
  } catch (err){
    res.status(500).json({status: 'error', sendback: err.message})
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const payload = await Category.create(req.body);
    res.status(200).json({status: 'success', sendback: payload})
  } catch (err){
    res.status(500).json({status: 'error', sendback: err.message})
  }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!updatedCategory[0]) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json({status: 'success', sendback: updatedCategory});
  } catch (err) {
    res.status(500).json({status: 'error', sendback: err.message});
  }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try{
    const payload = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({status: 'success'})
  }catch(err){
    res.status(500).json({status: 'error', sendback: err.message})
  }
});

module.exports = router;
