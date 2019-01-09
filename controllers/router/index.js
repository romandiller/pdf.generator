// router
'use strict';
const express = require('express');
const router = express.Router();

const home = require('./home');
const api = require('./api');

router.get('/', home.get);
router.get('/api/:action', api.get);

module.exports = router;