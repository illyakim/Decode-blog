const express = require('express');
const mongoose = require('mongoose');
const app = express();

require('./server/config/db')

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded())

app.use(require('./server/pages/router'));
app.use(require('./server/Categories/router'));
app.use(require('./server/auth/router'))







const PORT = 8000;
app.listen(PORT, () => {
    console.log(`server works on port ${PORT}`);
})