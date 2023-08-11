function sendComment(e) {
    e.preventDefault()
    const comment_text = document.querySelector('#comment-text').value
    const author = document.querySelector('#comment_author').value
    const comment_blog_id = document.querySelector('#comment_blog_id').value
    if (comment_text) {
        axios.post('/api/comment', { text: comment_text, authorId: author, blogId: comment_blog_id }).then(data => {
            if (data.data) {
                location.reload()
            }
        })
    }
}