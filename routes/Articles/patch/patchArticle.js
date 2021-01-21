const express = require(`express`)
const mongoose = require(`mongoose`)
const createError = require(`http-errors`)

const router = express.Router()

const Article = require(`../../../models/articleModel/articlesModel`)

router.patch(`/patchonearticle/v1/api/:articleId`, async (req, res, next) => {

    const queryParams = req.params.articleId

    const {name, description} = req.body

    if (!name && !description) {
        next(createError(400, `Please input to update details`))
    }

    try {

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