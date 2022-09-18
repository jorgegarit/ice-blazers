const express = require('express')
const {User} = require('../models/')
const { generateToken, authenticateToken } = require('../utils/jwt.utils')
const bcrypt = require('bcrypt')

const userRouter = express.Router();

userRouter.get('/register', (req, res) => {
    res.send('in the register route')
})

userRouter.post('/register', async (req, res) => {
    console.log(req.body)

    const password = bcrypt.hashSync(req.body.password, 10)

    // Automatically creates and saves User
    const user = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: password
        });

    return res.send('register')
})

userRouter.post("/login", async (req, res) => {
  console.log(req.body);
 

  if (User.findOne({ where: { email: req.body.email } })) {
     const user = await User.findOne({ where: { email: req.body.email } });

     const verified = bcrypt.compareSync(req.body.password, user.password);

     if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = generateToken(user.id)
        res.status(200).json({
            id: user.id,
            token: token
        })
     } else {
        res.status(404).send({ message: "Not found." });
     }

  } else {
    res.status(404).send({ message: "Not found." });
  }

  return res.send("login");
});

module.exports = userRouter;