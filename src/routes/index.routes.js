const express = require('express');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require("../lib/auth");

const { Router } = express;

const router = Router();

router.get("/", (req, res) => {
    
});

router.get("/signup", isNotLoggedIn ,(req, res) => {
    res.render("signup");
});

router.post("/signup", isNotLoggedIn ,passport.authenticate("local.signup", {
    // Este metodo toma el nombre de la authenticacion que hemos creado en el archivo /lib/passport en este caso el nombre es local.signup

    // Propiedad que se ejecuta cuando la authenticacion sale bien
    successRedirect: "/profile",

    // Propiedad que se ejecuta cuando la authenticacion sale mal
    failureRedirect: "/signup",

    // Propiedad para enviar un mensaje en caso falle, mensajes flash
    failureFlash: true
}));

router.get("/signin", isNotLoggedIn, (req, res) => {
    res.render("signin");
});

router.post("/signin", isNotLoggedIn ,async (req, res, next) => {
    passport.authenticate("local.signin", {
        successRedirect: "/profile",
        failureRedirect: "/signin",
        failureFlash: true
    })(req, res, next);
});

router.get("/profile", isLoggedIn, (req, res) => {
    res.render("profile");
});

router.get("/logout",  isLoggedIn ,(req, res) => {
    req.logOut();
    res.redirect("/signin"); 
});



module.exports = router;