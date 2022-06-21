const express = require('express');
const router = express.Router();
const controller = require('../controllers/systemctl');

router.get('/', controller.list);
router.get('/status/:service', controller.status);
router.get('/start/:service', controller.start);
router.get('/stop/:service', controller.stop);
router.get('/restart/:service', controller.restart);
router.get('/enable/:service', controller.enable);
router.get('/disable/:service', controller.disable);

module.exports = router;
