const router = require('express').Router();
const sequelize = require('sequelize');
const {User, Journal, Comment} = require('../models');


router.get('/', (req, res) =>
{
    Journal.findAll
    ({
        attributes: ['id', 'title', 'updated_at'],
        include:
        [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData =>
    {
        const journals = dbPostData.map(journal => journal.get({plain: true}));
        res.render('homepage', {journals});
    })
    .catch(err =>
    {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/login', (req, res) =>
{
    if (req.session.loggedIN)
    {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;