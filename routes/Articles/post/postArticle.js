const express = require(`express`)
const mongoose = require(`mongoose`)
const createError = require(`http-errors`)

const router = express.Router()

const Article = require(`../../../models/articleModel/articlesModel`)

router.post(`/submitarticle/v1/api`, async (req, res, next) => {

    const {name, description} = req.body

    try {

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