const router = require('express').Router();
const ctrl = require('../controllers/staffController');
const { protect, adminOnly } = require('../middlewares/auth');

router.get('/', protect, adminOnly, ctrl.list);
router.post('/', protect, adminOnly, ctrl.create);
router.put('/:id', protect, adminOnly, ctrl.update);
router.delete('/:id', protect, adminOnly, ctrl.remove);

module.exports = router;
