const Blog = require('./Blogs')
const User = require('../auth/User')
const fs = require('fs')
const path = require('path')
const createBlog = async (req, res) => {
    if (req.file &&
        req.body.name.length > 2 &&
        req.body.category.length > 2 &&
        req.body.description.length > 2) {
        await new Blog({
            name: req.body.name,
            category: req.body.category,
            image: `/images/blogs/${req.file.filename}`,
            description: req.body.description,
            author: req.user._id
        }).save()
        res.redirect(`/profile/${req.user._id}`)
    } else {
        res.redirect('/newblog?error=1')
    }
}

const editBlog = async (req, res) => {
    if (
        req.file &&
        req.body.name.length > 2 &&
        req.body.description.length > 2 &&
        req.body.category.length > 0
    ) {
        const blog = await Blog.findById(req.body.id)
        fs.unlinkSync(path.join(__dirname + '../../../public' + blog.image))
        await Blog.findByIdAndUpdate(req.body.id, {
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            image: `/images/blogs/${req.file.filename}`,
            author: req.user._id,
        })
        res.redirect('/profile/' + req.user._id)
    } else {
        res.redirect(`/editblog/${req.body.id}?error=1`)
    }
}

module.exports = {
    createBlog,
    editBlog
}