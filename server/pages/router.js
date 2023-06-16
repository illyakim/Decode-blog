const express = require('express')
const router = express.Router()
const Categories = require('../Categories/Categories')

router.get('/', async (req, res) => {
    const allCategories = await Categories.find()
    res.render('main-page', { categories: allCategories })
})

router.get('/login', (req, res) => {
    res.render('login.ejs')
})

router.get('/register', (req, res) => {
    res.render('register.ejs')
})

router.get('/profile', (req, res) => {
    res.render('profile.ejs')
})

router.get('/newblog', async (req, res) => {
    const allCategories = await Categories.find()
    res.render('new-blog', { categories: allCategories })
})

module.exports = router