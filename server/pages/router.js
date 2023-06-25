const express = require('express')
const router = express.Router()
const Categories = require('../Categories/Categories')

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

router.get('/profile/:id', (req, res) => {
    res.render('profile.ejs', { user: req.user ? req.user : {} })
})

router.get('/newblog', async (req, res) => {
    const allCategories = await Categories.find()
    res.render('new-blog', { categories: allCategories, user: req.user ? req.user : {} })
})

module.exports = router