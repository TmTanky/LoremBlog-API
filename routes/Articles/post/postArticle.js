const express = require(`express`)
const mongoose = require(`mongoose`)
const createError = require(`http-errors`)
const jwt = require("jsonwebtoken")

const router = express.Router()

const Article = require(`../../../models/articleModel/articlesModel`)

router.post(`/submitarticle/v1/api`, async (req, res, next) => {

    const {name, description} = req.body

    let token

    if (req.headers.authorization && req.headers.authorization.startsWith(`Bearer`)) {
        token = req.headers.authorization.split(` `)[1]
    }

    if (!token) {
        return next(createError(401, `Please Log In.`))
    }

    try {

        jwt.verify(token, process.env.JWT_SECRET_KEY)

        const newArticle = await new Article({
            name,
            description
        })

        if (!newArticle.name) {
            return next(createError(400, `Please input the article name`))
        }

        const postedArticle = await newArticle.save()

        res.json({
            status: res.statusCode,
            data: postedArticle
        })
        
    } catch (err) {
        next(createError(err.status, err))
    }

})

module.exports = router