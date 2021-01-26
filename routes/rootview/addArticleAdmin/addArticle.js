const express = require(`express`)
const createError = require(`http-errors`)
const jwt = require("jsonwebtoken")
const router = express.Router()

const Article = require(`../../../models/articleModel/articlesModel`)

router.get(`/admin/addarticle`, async (req, res, next) => {

    const kuki = req.session.ID

    try {

        if (!kuki) {
            next(createError(401, `Unauthorized`))
        } else {
            jwt.verify(kuki, process.env.JWT_SECRET_KEY)
    
            res.render(`addarticle`)
        }
        
    } catch (err) {
        next(createError(err.status, err))
    }

    

})

router.post(`/admin/addarticle`, async (req, res, next) => {

    try {
        
        const {name, description} = req.body

        if (!name, !description) {
            next(createError(400, `Please input all fields.`))
        }

        const newArticle = await new Article({
            name,
            description
        })

        if (name && description) {
            await newArticle.save()
            res.redirect(`/admin/addarticle`)
        }

        
    } catch(err) {
        
        if (err.code === 11000) {
            return next(createError(err.status, `Name already exists.`))
        }

        next(createError(err.status, err))
    }


})


module.exports = router