const express = require(`express`)
const mongoose = require(`mongoose`)
const createError = require(`http-errors`)
const jwt = require("jsonwebtoken")

const router = express.Router()

const Article = require(`../../../models/articleModel/articlesModel`)

router.patch(`/patchonearticle/v1/api/:articleId`, async (req, res, next) => {

    const queryParams = req.params.articleId

    const {name, description} = req.body

    let token

    if (req.headers.authorization && req.headers.authorization.startsWith(`Bearer`)) {
        token = req.headers.authorization.split(` `)[1]
    }

    if (!token) {
        return next(createError(401, `Please Log In.`))
    }

    if (!name && !description) {
        next(createError(400, `Please input to update details`))
    }

    try {

        jwt.verify(token, process.env.JWT_SECRET_KEY)

        if (queryParams.match(/^[0-9a-fA-F]{24}$/)) {
            const currentQuery = await Article.findOneAndUpdate({_id: queryParams}, req.body) 

            if (!currentQuery) {
                next(createError(err.status, err))
            }
    
            res.json({
                status: res.statusCode,
                message: `Successfully patch.`,
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