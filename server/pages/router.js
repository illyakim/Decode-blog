const express = require('express')
const router = express.Router()
const Categories = require('../Categories/Categories')
const User = require('../auth/User')
const Blog = require('../Blogs/Blogs')
const Blogs = require('../Blogs/Blogs')
const Comments = require('../Comments/Comments')

router.get('/', async (req, res) => {
    const options = {}
    const categories = await Categories.findOne({ key: req.query.categ })
    if (categories) {
        options.category = categories._id
        res.locals.category = req.query.categ
    }
    let page = 0
    const limit = 3
    if (req.query.page && req.query.page > 0) {
        page = req.query.page
    }
    if(req.query.search && req.query.search.length>0){
        options.$or=[
            {
            name:new RegExp(req.query.search, 'i')
            },
            {
            description:new RegExp(req.query.search, 'i')
            },
        ]
        res.locals.search=req.query.search
    }


    const totalBlogs = await Blogs.count(options)
    console.log(totalBlogs)
    const allCategories = await Categories.find()
    const blogs = await Blogs.find(options).limit(limit).skip(page * limit).populate('category').populate('author')
    res.render('main-page.ejs', { categories: allCategories, user: req.user ? req.user : {}, blogs, pages: Math.ceil(totalBlogs / limit) })
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

router.get('/detail/:id', async (req, res) => {
    const comments = await Comments.find({ blogId: req.params.id })
    console.log(comments)
    const blog = await Blogs.findById(req.params.id).populate('category')
    res.render("detail", { user: req.user ? req.user : {}, blog: blog, comments })
})

module.exports = router
