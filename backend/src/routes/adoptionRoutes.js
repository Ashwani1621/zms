const router = require('express').Router();
const ctrl = require('../controllers/adoptionController');
const { protect, adminOnly } = require('../middlewares/auth');

router.get('/', protect, adminOnly, ctrl.list); // admin view
router.post('/', ctrl.create);                  // public adopt

module.exports = router;
