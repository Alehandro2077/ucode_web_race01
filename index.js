const express = require('express');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const router = require('./router');

const app = express();
const PORT = 6060;

app.listen(PORT);
app.set('view engine', 'ejs');
// console.log(`Server listening on port ${PORT}`);
app.use(fileUpload({createParentPath: true}))
app.use(session({secret: 'aboba', resave: false, saveUninitialized: false}));
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use('/', router);
