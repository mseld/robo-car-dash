const express = require('express');
const router = express.Router();
const bookmarks_router = require('./bookmarks');
const system_router = require('./system');
const service_router = require('./service');
const systemctl_router = require('./systemctl');

router.use('/bookmarks', bookmarks_router);
router.use('/system', system_router);
router.use('/services', service_router);
router.use('/systemctl', systemctl_router);

module.exports = router;