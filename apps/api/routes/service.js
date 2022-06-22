const express = require('express');
const router = express.Router();
const controller = require('../controllers/service');

router.get('/', controller.list);
router.post('/', controller.add);
router.delete('/:service', controller.remove);

module.exports = router;
