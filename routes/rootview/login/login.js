const express = require(`express`)
const createError = require(`http-errors`)
const bcrypt = require(`bcrypt`)
const jwt = require(`jsonwebtoken`)

const router = express.Router()

const User = require(`../../../models/userModel/modelUser`)

router.get(`/admin/login`, (req, res, next) => {

    res.render(`login`)

})

router.post(`/admin/login`, async (req, res, next) => {

    const {email, password} = req.body

    await User.findOne({email}, (err, foundUser) => {
        if (err) {
            next(createError(err.status, err))
        } else if (foundUser) {
            bcrypt.compare(password, foundUser.password, async (err, result) => {
                if (result) {

                    const token = await jwt.sign({id: foundUser._id}, process.env.JWT_SECRET_KEY, {expiresIn: `1d` })
                    
                    const kuki = req.session.ID = token

                    res.redirect(`/admin/addarticle`)
                } else {
                    res.send(`Invalid Password`)
                }
            })
        } else {
            console.log(`User not found`)
        }
    })
    
})

module.exports = router