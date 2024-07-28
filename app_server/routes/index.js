<<<<<<< HEAD
var express = require('express');
var router = express.Router();

const ctrlMain = require('../controllers/main');

/*GET home page */
=======
const express = require('express');
const router = express.Router();
const ctrlMain = require('../controllers/main');

/* GET home page. */
>>>>>>> 381cf44 (Module 3 completed baseline)
router.get('/', ctrlMain.index);

module.exports = router;