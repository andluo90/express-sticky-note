require('../../less/modal.less')
const toast  = require('./toast')
const note = require('./note')
const event = require('./eventHub')


function Modal(){
    this.container = $('.modal')
    this.$textarea = this.container.find('.content')
    this.event = event
    this.bind()
    
}

Modal.prototype = {

    
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
        this.$textarea.val('')
        this.container.addClass('active')
    },
    close:function(){
        this.container.removeClass('active')        
    },
    addNote(){
        const val = this.$textarea.val()
        if(val !== ''){
            //添加的时候还要加上用户和等级
            $.post('api/notes/add',{text:val})
             .done((data)=>{
                const id = data.id
                date = new Date().toISOString().split('T')[0]
                note(id,date,val,0)
                this.close()
                this.event.emit('reLayout')
                toast('添加成功')
             })
             .fail((error)=>{
                 console.log('网络异常')
                 toast('网络异常')
             })
            
            
        }else{
            toast('内容不能为空')
        }
    }
    
}

const modal = new Modal()

module.exports = modal