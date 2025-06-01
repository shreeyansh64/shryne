const exp = require('express');
const router = exp.Router();
const userRouter = require('./user')

router.use('/user' , userRouter)

module.exports = router;