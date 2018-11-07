var express = require('express'), app = express();
var logger = require('morgan');
var bodyPaser = require('body-parser');
var method = require('method-override');

var post = require('./routes/post');

var cookie = require('cookie-parser');
var session = require('express-session');
var csrf = require('csurf');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded());
app.use(method());

app.use(method('_method'))

app.use(cookie());
app.use(session({secret: 'aaaaaaaa'}));
app.use(csrf());
app.use(function(req, res, next) {
    res.locals.csrftoken = req.csrfToken();
    next();
});

app.use(logger('dev'));

// routing

app.get('/', post.index);
app.get('/posts/:id([0-9]+)', post.show);
app.get('/posts/new', post.new);
app.post('/posts/create', post.create);
app.get('/posts/:id/edit', post.edit);
app.put('/posts/:id', post.update);
app.delete('/posts/:id', post.destroy);

app.listen(3000);
console.log('server starting...');