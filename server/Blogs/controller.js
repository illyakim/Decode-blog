const Blog = require('./Blogs')
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

const editBlog = (req, res) => {
    if (req.file && req.body.name.length > 2 &&
        req.body.description.length > 2 &&
        req.body.category.length > 0) {
    } else {
        res.redirect(`/editblog/${req.body.id}?error=1`)
    }
}

module.exports = {
    createBlog,
    editBlog
}