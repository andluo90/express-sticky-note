const express = require('express')
const router = express.Router();

const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

passport.serializeUser(function(user, done) {
    console.log('---serializeUser---')
    console.log(user)
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    console.log('---deserializeUser---')
    done(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: 'e0ebd8866468a0d7d0e1',
    clientSecret: 'bb143a93b2461e2723ac78a1e7b6b063b320b1c9',
    callbackURL: "http://localhost:4000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    // });
    done(null, profile);
  }
));

router.get('/github',passport.authenticate('github'));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('获取github信息成功')
    console.log(req.user)
    req.session.user = {
      id: req.user.id,
      username: req.user.displayName || req.user.username,
      avatar: req.user._json.avatar_url,
      provider: req.user.provider
    };
    res.redirect('/');
});

router.get('/logout', function(req, res){
    req.session.destroy();
    res.redirect('/');
})

module.exports = router;

