const express = require('express');
const router = express.Router();
const controller = require('../controllers/links');

router.post('/', controller.add);
router.delete('/:service', controller.remove);

module.exports = router;
