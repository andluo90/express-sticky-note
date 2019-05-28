require('../../less/modal.less')
const toast  = require('./toast')
const note = require('./note')
const event = require('./eventHub')


function Modal(){
    
    this.container = $('.modal')
    this.$title = this.container.find('.title .name')
    this.$btnName = this.container.find('.addBtn>span')
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
            self.submit()
        })
    },
    add:function(){
        this.$title.text('添加新便笺')
        this.$btnName.text('添加')
        this.$textarea.val('')
        this.container.addClass('active')
    },
    edit:function(id,content){
        this.$title.text('修改便笺')
        this.$btnName.text('修改')
        this.$textarea.val(content)
        this.container.addClass('active')

    },
    close:function(){
        this.container.removeClass('active')        
    },
    submit(){
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