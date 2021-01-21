require('dotenv').config()
const express = require(`express`)
const bodyParser = require(`body-parser`)
const mongoose = require(`mongoose`)
const createError = require(`http-errors`)

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

// main
const rootRouter = require(`./routes/root/main`)
// users
const signUpRouter = require(`./routes/Users/signUp/signUp`)
const loginRouter = require(`./routes/Users/logIn/login`)
// articles
const postArticleRouter = require(`./routes/Articles/post/postArticle`)
const getAllArticlesRouter = require(`./routes/Articles/getAll/getAll`)
const deleteArticleRouter = require(`./routes/Articles/delete/deleteArticle`)
const getOneArticleRouter = require(`./routes/Articles/getOne/getOneArticle`)
const patchOneArticleRouter = require(`./routes/Articles/patch/patchArticle`)

// connect to DB
mongoose.connect(process.env.DB,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})

// Main route
app.use(rootRouter)

// Sign up & Log in route

app.use(signUpRouter)
app.use(loginRouter)

// Articles route

app.use(postArticleRouter)
app.use(getAllArticlesRouter)
app.use(deleteArticleRouter)
app.use(getOneArticleRouter)
app.use(patchOneArticleRouter)

app.use((req, res, next) => {
    next(createError(404, `URL not found`))
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status,
            message: err.message
        }
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running.`)
})