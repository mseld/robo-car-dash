const express = require('express');
const router = express.Router();
const controller = require('../controllers/system');

router.get('/', controller.info);

module.exports = router;
