const express = require(`express`)
const createError = require(`http-errors`)

const router = express.Router()

router.get(`/adminlogout`, async (req, res, next) => {

    try {

        const kuki = req.session.ID = null

        res.send(`Succesfully logged out`)
        
    } catch (err) {
        next(createError(err.status, err))
    }

})

module.exports = router