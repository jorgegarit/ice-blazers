const router = require('express').Router();

const userRoutes = require('./user-routes')

// we will be prefixing the routers from users.js with the /users path
router.use('/users', userRoutes);

module.exports = router;