const router = require('express').Router();
const ctrl = require('../controllers/ticketController');
const { protect, adminOnly } = require('../middlewares/auth');

router.get('/', protect, adminOnly, ctrl.list); // admin view
router.post('/', ctrl.create);                  // public booking

module.exports = router;
