const router = require('express').Router();
const ctrl = require('../controllers/animalController');
const { protect, adminOnly } = require('../middlewares/auth');

router.get('/', ctrl.list);
router.post('/', protect, adminOnly, ctrl.create);
router.put('/:id', protect, adminOnly, ctrl.update);
router.delete('/:id', protect, adminOnly, ctrl.remove);

module.exports = router;
