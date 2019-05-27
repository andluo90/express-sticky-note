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
            $.post('api/notes/add',{id:123,note:'for test.'})
             .done((data)=>{
                console.log('新增成功')
                console.log(data)
                note('123','2019-05-20',val,0)
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