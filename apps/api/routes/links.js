const express = require('express');
const router = express.Router();
const controller = require('../controllers/links');

router.get('/', controller.list);
router.post('/', controller.add);
router.delete('/:key', controller.remove);

module.exports = router;
