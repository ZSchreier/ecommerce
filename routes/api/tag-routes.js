const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
// be sure to include its associated Product data
router.get('/', async (req, res) => {
  try {
    const payload = await Tag.findAll({
      include: [{model: Product}]
    });
    res.status(200).json({status: 'success', sendback: payload})
  } catch (err){
    res.status(500).json({status: 'error', sendback: err.message})
  }
});

// find a single tag by its `id`
// be sure to include its associated Product data
router.get('/:id', async (req, res) => {
  try {
    const payload = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    res.status(200).json({status: 'success', sendback: payload})
  } catch (err){
    res.status(500).json({status: 'error', sendback: err.message})
  }
});

// create a new tag
router.post('/', async (req, res) => {
  try {
    const payload = await Tag.create(req.body);
    res.status(200).json({status: 'success', sendback: payload})
  } catch (err){
    res.status(500).json({status: 'error', sendback: err.message})
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!updatedTag[0]) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json({status: 'success', sendback: updatedTag});
  } catch (err) {
    res.status(500).json({status: 'error', sendback: err.message});
  }
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try{
    const payload = await Tag.destroy({
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
