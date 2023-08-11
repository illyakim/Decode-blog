const passport = require('passport')
const User = require('../auth/User')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local')
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function (email, password, done) {
        User.findOne({ email }).then(user => {
            bcrypt.compare(password, user.password, function (err, result) {
                if (err) {
                    return done(err)
                }
                if (result) {
                    return done(null, user)
                }
            });
        }).catch(e => {
            return done(e)
        })
    }
))

passport.use(new GoogleStrategy({
    clientID: '74544454235-sg8n8uil4pguqkg47o1blipebg9e4u5d.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:3000/api/auth/google",
    scope: ['openid', 'email', 'profile']
},
    async function (accessToken, refreshToken, profile, cb) {
    const user = await User.findOne({ googleId: profile.id })
    console.log(user);
    if (!user) {
        const newUser = await new User({
            googleId: profile.id,
            full_name: profile.displayName,
            email: profile.emails[0].value
        }).save()
        return cb(null, newUser)
    } else return cb(null, user)

}
));

passport.serializeUser(function (user, done) {
    console.log(user)
    done(null, user._id)
})

passport.deserializeUser(function (id, done) {
    User.findById(id).then((user, err) => {
        console.log(id)
        done(err, user)
    })
})

