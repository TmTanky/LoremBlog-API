const express = require(`express`)
const mongoose = require(`mongoose`)
const createError = require(`http-errors`)

const router = express.Router()

const Article = require(`../../../models/articleModel/articlesModel`)

router.get(`/getonearticle/v1/api/:articleId`, async (req, res, next) => {

    const queryParams = req.params.articleId

    try {

        if (queryParams.match(/^[0-9a-fA-F]{24}$/)) {
            const currentQuery = await Article.findOne({_id: queryParams})

            res.json({
                status: res.statusCode,
                data: currentQuery
            })
        } else {
            next(createError(500, `Invalid ID`))      
        }

    } catch (err) {
        next(createError(err.status, err))
    }

})

module.exports = router