const {Router} = require('express');
const {Episode} = require('../db');
const router = Router();

router.get('/', async (req, res, next) => {
    Episode.findAll()
        .then(ep => res.json(ep))
        .catch (error => next(error))
});

module.exports = router;