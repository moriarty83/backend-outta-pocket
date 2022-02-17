const router = require('express').Router();
const ctrl = require('../controllers');

const Auth = require("../middleware/Auth");

router.get('/', ctrl.comments.commentIndex);
router.get('/:id', ctrl.comments.commentShow);
router.put('/:id', Auth, ctrl.comments.commentUpdate);
router.post('/', Auth, ctrl.comments.commentCreate);
router.delete('/:id', Auth, ctrl.comments.commentDelete);

module.exports = router;