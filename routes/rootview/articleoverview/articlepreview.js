const express = require(`express`)
const createError = require(`http-errors`)

const router = express.Router()

const Article = require(`../../../models/articleModel/articlesModel`)

router.get(`/articles/:id`, async (req, res, next) => {

    try {
        
        await Article.findOne({_id: req.params.id}, (err, foundArticle) => {
            if (err) {
                next(createError(err.status, err))
            } else if (foundArticle) {
                console.log(foundArticle)
                res.render(`previewarticle`, {article: foundArticle})
            }
        })

    } catch (err) {
        next(createError(err.status, err))
    }

})

module.exports = router