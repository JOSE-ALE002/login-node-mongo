const passport = require('passport');
const User = require("../models/user");
const LocalStrategy = require('passport-local').Strategy;

passport.use("local.signin", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async (req, email, password, done) => {    
    const usuario = await User.findOne({email});

    if(usuario) {
        const validPassword = await usuario.comparePassword(password, usuario.password);

        if (validPassword) {
            return done(null, usuario, req.flash("success", "Welcome " + usuario.email))
        } else {
            return done(null, false, req.flash("message", "Password Incorrect"));
        }
    } else {
        return done(null, false, req.flash("message", "The Username does not exist"));
    }
}));


passport.use("local.signup", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",  
    passReqToCallback: true    
}, async (req, email, password, done) => {

    const user = await User.findOne({email});

    if(user) {
        return done(null, false, req.flash("message", "El email ingresado ya ha sido registrado"));
    } else {
        const newUser = new User(req.body);
        newUser.password = await newUser.encryptPassword(password)
        await newUser.save();
        done(null, newUser);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

