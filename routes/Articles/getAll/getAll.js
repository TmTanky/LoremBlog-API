const express = require(`express`)
const mongoose = require(`mongoose`)
const createError = require(`http-errors`)
const router = express.Router()

const Article = require(`../../../models/articleModel/articlesModel`)

router.get(`/getallarticle/v1/api/`, async (req, res, next) => {

    try {

        const query = await Article.find({})

        if (!query) {
            next(createError(`404`, `Article not found`))
        }

        res.json({
            status: res.statusCode,
            result: query.length,
            data: query
        })
        
    } catch (err) {
        next(createError(err.status, err))
    }

    

})

module.exports = router