const express = require('express')
const router = express.Router()
const { upload } = require('./multer')
const { createBlog, editBlog } = require('./controller')
const { isAuth } = require('../auth/middlewares')

router.post('/api/blogs/newblog', isAuth, upload.single('image'), createBlog)
router.post('/api/blogs/editblog', isAuth, upload.single('image'), editBlog)
router.post('/profile/:id', async (req, res) => {
    if (req.file &&
        req.body.name.length > 2 &&
        req.body.category.length > 2 &&
        req.body.description.length > 2) {
        await new Blogs({
            name: req.body.name,
            category: req.body.category,
            image: `${req.file.destination}/${req.file.filename}`,
            description: req.body.description,
            author: req.user._id
        }).save()
        res.redirect(`/profile/${req.user._id}`)
    } else {
        res.redirect('/newblog?error=1')
    }
})

module.exports = router