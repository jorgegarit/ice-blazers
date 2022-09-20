const router = require('express').Router();

const api = require("./api");

// creating /api path
router.use('/api', api);

// if a request is made to a non existent endpoint a 404 error will appear
router.use((req, res) => {
    res.status(400).end();
});

module.exports = router;