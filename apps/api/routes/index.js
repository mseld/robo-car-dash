const express = require('express');
const router = express.Router();
const links_router = require('./links');
const system_router = require('./system');
const service_router = require('./service');
const systemctl_router = require('./systemctl');

router.use('/links', links_router);
router.use('/system', system_router);
router.use('/services', service_router);
router.use('/systemctl', systemctl_router);

module.exports = router;