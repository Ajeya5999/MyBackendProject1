const express = require("express");
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require("./config/mongoose");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const mongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const passportJwt = require('./config/passport-jwt-strategy');

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');



app.use(session({
    name: 'codeial',
    secret: 'abcd', //TODO change the secret
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: mongoStore.create({ mongoUrl: 'mongodb://localhost/test-app' })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.log(`Error : ${err}`);
        return;
    }
    console.log("Server is up and running");
    return;
})