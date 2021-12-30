const express = require('express');
const path = require('path');
const morgan = require('morgan');
const engine = require('ejs-mate');
const passport = require('passport');
const session = require('express-session');
const flash = require("connect-flash");
require("dotenv").config();

// Instancia de express
const app = express();
require("./database");
require("./lib/passport");

const port = process.env.PORT || 3000;

app.engine("ejs", engine);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use(session({
    secret: "Alejanadro",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Globals Variables
app.use((req, res, next) => {
    app.locals.message = req.flash("message");
    app.locals.success = req.flash("success");
    app.locals.user = req.user;
    next();
});

// Routes
app.use(require("./routes/index.routes"));

// 404 Page

app.use((req, res, next) => {
    res.status(404).render("404", {

    });
});

// Server on
app.listen(port, () => {
    console.log("Server on port", port);
})