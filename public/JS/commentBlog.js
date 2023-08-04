function sendComment(e) {
    e.preventDefault()
    const comment_text = document.querySelector('#comment-text').value
    const author = document.querySelector('#comment_author').value

    if (comment_text.length) {
        axios.post('/api/comment', { text: comment_text, authorId: author }).then(data => {
            if (data.data) {
                location.reload()
            }
        })
    }
}