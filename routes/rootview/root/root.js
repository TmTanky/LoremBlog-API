const express = require(`express`)
const createError = require(`http-errors`)

const router = express.Router()

const Article = require(`../../../models/articleModel/articlesModel`)

router.get(`/`, async (req, res, next) => {

    try {

        const getAllArticles = await Article.find({})

        res.render(`root`, {articles: getAllArticles})
        
    } catch (err) {
        next(createError(err.status, err))
    }
    

})



module.exports = router