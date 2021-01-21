const express = require(`express`)
const mongoose = require(`mongoose`)
const bcrypt = require(`bcrypt`)
const {body, validationResult} = require(`express-validator`)
const createError = require(`http-errors`)

const saltRounds = 10
const router = express.Router()

const Users = require(`../../../models/userModel/modelUser`)

router.post(`/signup/v1/api`,body(`email`).isEmail().withMessage(`Email must be valid.`),body('password').isLength({ min: 5 }).withMessage(`Password must be more than 5 or more characters.`), async (req, res, next) => {

    const {name, email, password} = req.body

    try {

        const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
            }

        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newPerson = await new Users ({
            name,
            email,
            password: hashedPassword
        })

        if (!newPerson) {
            next(createError(400, `Invalid Request`))
        }

        const newUser = await newPerson.save()

        res.json({
            status: res.statusCode,
            data: newUser
        })
        
    } catch (err) {
        next(createError(err.status, err))
    }

})

module.exports = router