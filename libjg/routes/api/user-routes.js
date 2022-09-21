const router = require('express').Router();
const { User } = require('../../models');

router.get('/', (req, res) => {
    User.findAll({
      attributes: { exclude: ['password']}
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    User.findOne({
      attributes: {exclude: ['password']},
      where: {
        id: req.params.id
      }
    })
    .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirm: req.body.confirm
    })
    .then(dbUserData => {
      req.session.save(() => {
        req.session.user_id =dbUserData.id;
        req.session.name = dbUserData.name;
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// authenticate user 
router.post('/login', (req, res) => {
  // will use email to authenticate
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No account found with that email' });
      return;
    }

    const validatePassword = dbUserData.passwordCheck(req.body.password);
    if (!validatePassword) {
      res.status(400).json({ message: 'Password is incorrect' });
      return;
    }

    req.session.save(() => {
      // session variables
      req.session.user_id = dbUserData.id;
      req.session.name = dbUserData.name;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: 'You have logged in' });
    }); 
  });
});

// exporting requests
module.exports = router;