const express = require(`express`)
const createError = require(`http-errors`)
const router = express.Router()

router.get(`/`, (req, res, next) => {
        res.json({
            status: res.statusCode,
            message: `Hello from LoremBlog API`
        })
})


// const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     try {

//         bcrypt.hash(req.body.password, saltRounds, function(err, hash) {

//             const newPerson = new Users({
//                 name: req.body.name,
//                 email: req.body.email,
//                 password: hash
//             })
    
//             const newUser = await newPerson.save()
    
//             res.json({
//                 status: res.statusCode,
//                 data: newUser
//             })
            
//         });

//     } catch (err) {
//         next(createError(err.status, err))
//     }

module.exports = router