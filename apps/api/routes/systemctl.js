const express = require('express');
const router = express.Router();
const controller = require('../controllers/systemctl');

router.get('/', controller.list);
router.get('/:service', controller.status);
router.get('/:service/start', controller.start);
router.get('/:service/stop', controller.stop);
router.get('/:service/restart', controller.restart);
router.get('/:service/enable', controller.enable);
router.get('/:service/disable', controller.disable);

module.exports = router;
