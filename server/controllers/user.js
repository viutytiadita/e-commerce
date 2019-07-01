const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('../helpers/jwt')
// const { OAuth2Client } = require('google-auth-library');
// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_KEY);

class UserController {
    static register(req, res, next) {
        console.log(req.body);
        
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        })
            .then((newuser) => {
                res.status(201).json(newuser)
            })
            .catch(next)
    }

    static login(req, res, next) {
        console.log(req.body);

        User.findOne({ email: req.body.email }, function (err, user) {
            if (err) {
                throw err
            } else {
                if (user) {
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        let obj = {
                            id: user._id,
                            email: user.email
                        }
                        res.status(200).json({ token: jwt.sign(obj), role: user.role })

                    } else {
                        res.status(400).json({
                            message: "wrong password"
                        })
                    }
                } else {
                    res.status(400).json({
                        message: "username wrong"
                    })
                }
            }
        })
    }

}

module.exports = UserController