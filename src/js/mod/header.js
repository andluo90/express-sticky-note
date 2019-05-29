require('../../less/header.less')
const event = require('./eventHub')

function header(){
    this.container = $('header')
    this.$all = this.container.find('.all')
    this.$uncompleted = this.container.find('.uncompleted')
    this.$order = this.container.find('.order')
    this.$login = this.container.find('.login')
    this.event = event
    
    this.bind()

}

header.prototype = {
    
    bind:function(){
        const self = this
        this.$all.on('click',function(){
            self.show(0)
        })
        this.$uncompleted.on('click',function(){
            self.show(1)
        })
        this.$order.on('click',function(){
            self.show(2)
        })
        this.$login.on('click',function(){
            $('.login').toggleClass('active')
            $('.loading').toggleClass('active')
        })
    },
    show:function(id){
        if(id === 0){
            if(!this.$all.hasClass('active')){
                console.log('显示全部')
                this.$all.addClass('active').siblings().removeClass('active')
                this.event.emit('showAll')
            }
        }else if(id === 1){
            if(!this.$uncompleted.hasClass('active')){
                console.log('显示未完成')
                this.$uncompleted.addClass('active').siblings().removeClass('active')
                this.event.emit('showUncompleted')
    
            }
            
        }else{
            console.log('显示排序')
            this.$order.addClass('active').siblings().removeClass('active')
        }
    },
    
}

function Header(){
    return new header()
}

module.exports = Header