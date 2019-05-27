require('../../less/index.less')

const waterfall = require('../mod/waterfall')
const modal = require('../mod/modal')
const header = require('../mod/header')


header()
waterfall()

$('.addNote').on('click',function(){
    modal.show()
})

console.log('index.js 执行完成.')