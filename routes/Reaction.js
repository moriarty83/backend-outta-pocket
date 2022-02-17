const router = require('express').Router();
const ctrl = require('../controllers');

const Auth = require("../middleware/Auth");

router.post('/', Auth, ctrl.reactions.reactionCreate);

module.exports = router;