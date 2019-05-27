require('../../less/modal.less')
const toast  = require('./toast')


function modal(){
    this.container = $('.modal')
    
    this.bind()
    
}

modal.prototype = {

    
    bind:function(){
        const self = this
        this.container.find('.close').on('click',function(){
            console.log('关闭弹窗')
            self.close()
        })
        this.container.find('.addBtn span').on('click',function(){
            console.log('添加便笺')
            self.addNote()
        })
    },
    show:function(){
        this.container.addClass('active')
    },
    close:function(){
        this.container.removeClass('active')        
    },
    addNote(){
        this.close()
        toast('添加成功.')
    }
    
}

function Modal(){
    return new modal()
}

module.exports = Modal