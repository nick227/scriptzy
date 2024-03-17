import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { login } from './src/commands/user/index.js';
dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: 'http://localhost:3200/auth/google/callback'
},
    async function (accessToken, refreshToken, profile, cb) {
        return cb(null, user);
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

async function setupGoogleAuth(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/auth/google',
        passport.authenticate('google', { scope: ['profile'] }));

    app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/login' }),
        function (req, res) {
            res.redirect('/');
        });

    app.post('/auth/google/callback', async (req, res) => {
        try {
            res.json({ message: 'Successfully authenticated' });
        } catch (error) {
            console.error('Failed to authenticate user:', error);
            res.status(500).json({ message: 'Failed to authenticate user' });
        }
    });

    app.put('/user/jwt', login);
}

export default setupGoogleAuth;