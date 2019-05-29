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
    console.log(`添加按钮距离页面右边的距离为${right}`)
}()

//计算页面的高度后调整main元素的高度

!function(){
    setTimeout(()=>{
        const scrollHeight = $(document).height()
        $('main').css({height:`${scrollHeight}px`})
        console.log(`main的高度为${scrollHeight}px`)
    },3000)
    

}()

    
    



$('.addNote').on('click',function(){
    modal.add() //显示添加note的窗口
})

console.log('index.js 执行完成.')