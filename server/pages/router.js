const express = require('express')
const router = express.Router()
const Categories = require('../Categories/Categories')
const User = require('../auth/User')
const Blog = require('../Blogs/Blogs')
const Blogs = require('../Blogs/Blogs')

router.get('/', async (req, res) => {
    const allCategories = await Categories.find()
    const blogs = await Blogs.find().populate('category')
    res.render('main-page.ejs', { categories: allCategories, user: req.user ? req.user : {}, blogs })
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
    const blogs = await Blogs.find().populate('category').populate('author')
    if (user) {
        res.render("profile", { user: user, categories: allCategories, loginUser: req.user, blogs: blogs })
    } else {
        res.redirect('/not-found')
    }
})

router.get('/newblog', async (req, res) => {
    const allCategories = await Categories.find()
    res.render('new-blog', { categories: allCategories, user: req.user ? req.user : {} })
})

router.get('/editblog/:id', async (req, res) => {
    const allCategories = await Categories.find()
    const blog = await Blogs.findById(req.params.id)
    res.render('edit-blog', { categories: allCategories, user: req.user ? req.user : {}, blog })
})


router.get('/not-found', (req, res) => {
    res.render("notFound")
})

module.exports = router
