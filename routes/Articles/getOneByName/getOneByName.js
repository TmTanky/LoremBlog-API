const express = require(`express`)
const mongoose = require(`mongoose`)
const createError = require(`http-errors`)
const jwt = require("jsonwebtoken")
const router = express.Router()

const Article = require(`../../../models/articleModel/articlesModel`)

router.get(`/getonebyname/v1/api/:articleName`, async (req, res, next) => {

    const queryName = req.params.articleName

    const newQueryName = queryName

    try {

        const currentQuery = await Article.findOne({name: queryName})

        if (currentQuery === null) {
            next(createError(404, `Article Not found.`))
        } else {
            res.json({
                status: res.statusCode,
                message: `Successful`,
                data: currentQuery
            })
        }

    } catch (err) {
        next(createError(err.status, err))
    }

})

module.exports = router