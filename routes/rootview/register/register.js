const express = require(`express`)
const createError = require(`http-errors`)
const bcrypt = require(`bcrypt`)
const jwt = require(`jsonwebtoken`)

const saltRounds = 10

const router = express.Router()

const User = require(`../../../models/userModel/modelUser`)

router.get(`/admin/register`, async (req, res, next) => {

    res.render(`register`)

})

router.post(`/admin/register`, async (req, res, next) => {

    const {name, email, password} = req.body

    if (!name || !email || !password) {
        return next(createError(400, `Please fill all required inputs.`))
    }

    try {

        await bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
                next(createError(err.status, err))
            } else if (hash) {
                
                const newAdmin = new User ({
                    name, 
                    email,
                    password: hash
                })

                const administrator = await newAdmin.save()

                const token = await jwt.sign({id: newAdmin._id}, process.env.JWT_SECRET_KEY, {expiresIn: `1d` })

                const kuki = req.session.ID = token

                res.redirect(`/admin/addarticle`)

            } 
            
        });
        
    } catch (err) {
        next(createError(err.status, err))
    }
    

})

module.exports = router