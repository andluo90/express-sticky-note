require('../../less/header.less')

function header(){
    this.container = $('header')
    this.$all = this.container.find('.all')
    this.$completed = this.container.find('.completed')
    this.$order = this.container.find('.order')
    this.$login = this.container.find('.login')
    this.bind()

}

header.prototype = {
    
    bind:function(){
        const self = this
        this.$all.on('click',function(){
            self.show(0)
        })
        this.$completed.on('click',function(){
            self.show(1)
        })
        this.$order.on('click',function(){
            self.show(2)
        })
        this.$login.on('click',function(){
            self.login()
        })
    },
    show:function(id){
        if(id === 0){
            if(!this.$all.hasClass('active')){
                console.log('显示全部')
                this.$all.addClass('active').siblings().removeClass('active')
            }
        }else if(id === 1){
            console.log('显示已完成')
            this.$completed.addClass('active').siblings().removeClass('active')
        }else{
            console.log('显示排序')
            this.$order.addClass('active').siblings().removeClass('active')
        }
    },
    login(){
        console.log('登录成功')
    }
}

function Header(){
    return new header()
}

module.exports = Header