require('../../less/index.less')

const waterfall = require('../mod/waterfall')
const modal = require('../mod/modal')
const header = require('../mod/header')


header()
waterfall()

!function(){
    //修复bug
    const right = $('header .wrapper').css('marginLeft') //计算添加按钮距离页面右边的距离
    $('.addNote').css({right:right})
}()
    
    



$('.addNote').on('click',function(){
    modal.add() //显示添加note的窗口
})

console.log('index.js 执行完成.')