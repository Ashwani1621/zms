const router = require('express').Router();
const ctrl = require('../controllers/authController');

router.post('/seed-admin', ctrl.seedAdmin); // one-time admin seeder
router.post('/login', ctrl.login);

module.exports = router;
