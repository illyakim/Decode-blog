const express = require('express')
const router = express.Router()
const Categories = require('../Categories/Categories')
const User = require('../auth/User')

router.get('/', async (req, res) => {
    const allCategories = await Categories.find()
    res.render('main-page.ejs', { categories: allCategories, user: req.user ? req.user : {} })
})

router.get('/login', (req, res) => {
    res.render('login.ejs', { user: req.user ? req.user : {} })
})

router.get('/register', (req, res) => {
    res.render('register.ejs', { user: req.user ? req.user : {} })
})

router.get('/profile/:id', async (req, res) => {
    const allCategories = await Categories.find()
    const user = await User.findById(req.params.id)
    if (user) {
        res.render("profile", { user: user, categories: allCategories, loginUser: req.user })
    } else {
        res.redirect('/not-found')
    }
})

router.get('/newblog', async (req, res) => {
    const allCategories = await Categories.find()
    res.render('new-blog', { categories: allCategories, user: req.user ? req.user : {} })
})


router.get('/not-found', (req, res) => {
    res.render("notFound")
})

module.exports = router

// Пишет loginUser is not defined