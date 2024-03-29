const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentsScheme = new mongoose.Schema({
    text: String,
    authorId: { type: Schema.Types.ObjectId, ref: 'user' },
    blogId: { type: Schema.Types.ObjectId, ref: 'blog' },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('comment', CommentsScheme)