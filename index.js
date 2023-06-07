const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render('main-page.ejs')
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})


const PORT = 8000;
app.listen(PORT, () => {
    console.log(`server works on port ${PORT}`);
})