const express = require(`express`)
const mongoose = require(`mongoose`)
const bcrypt = require(`bcrypt`)
const createError = require(`http-errors`)
const jwt =require(`jsonwebtoken`)

const router = express.Router()

const Users = require(`../../../models/userModel/modelUser`)

router.post(`/login/v1/api`, async (req, res, next) => {

    const {email, password} = req.body

    try {

        const existUser = await Users.findOne({email})

        if (existUser) {
            bcrypt.compare(password, existUser.password, async (err, result) => {
                if (result) {

                    const token = await jwt.sign({id: existUser._id}, process.env.JWT_SECRET_KEY)

                    res.json({
                        status: res.statusCode,
                        token,
                        data: existUser
                    })
                } else {
                    next(createError(400, `Invalid Email or Password`))
                }
            })
        } else {
            next(createError(400, `Invalid Email or Password`))
        }

        // Old logic code

        // const existUser = await Users.findOne({email}, (err, foundUser) => {
        //     if (err) {
        //         next(createError(err.status))
        //     } else {
        //         if (foundUser) {
        //             if(foundUser) {
        //                 bcrypt.compare(password, foundUser.password, (err, result) => {
        //                     if (result) {
        //                         res.json({
        //                             status: res.statusCode,
        //                             data: foundUser
        //                         })
        //                     } else {
        //                         next(createError(400, `Invalid Email or Password`))
        //                     }
        //                 })
        //             }
        //         } else {
        //             next(createError(400, `Invalid Email or Password`))
        //         }
        //     }

        // })
        
    } catch (err) {
        next(createError(err.status, err))
    }

})

module.exports = router