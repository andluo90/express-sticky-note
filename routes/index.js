var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let data;
  if(req.session.user){
    console.log('用户已经登录')
    data = {
      isLogin: true,
      user: req.session.user
    }
  }else {
    console.log('用户未登录')
    data = {
      isLogin: false
    }
  }
  console.log(data)
  res.render('index', data);
});

module.exports = router;
