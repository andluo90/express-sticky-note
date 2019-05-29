require('../../less/modal.less')
const toast  = require('./toast')
const note = require('./note')
const event = require('./eventHub')


function Modal(){
    this.type = 'add' //窗口类型：add是新增 edit是修改
    this.container = $('.modal')
    this.$title = this.container.find('.title .name')
    this.$btnName = this.container.find('.addBtn>span')
    this.grade = 0
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
            self.submit()
        })

        this.container.find('.icon-xingxingman').on('click',(e)=>{
            const x = $(e.target)
            const grade = x.data('grade')
            self.grade = grade
            x.css({color:'#00d4ed'})
            x.prevAll('.icon-xingxingman').css({color:'#00d4ed'})
            x.nextAll().css({color:'#dbdbdb'})
             
        })
    },
    add:function(){
        this.$title.text('添加新便笺')
        this.$btnName.text('添加')
        this.$textarea.val('')
        this.grade = 0
        this.container.find('.icon-xingxingman').css({color:'#dbdbdb'})
        this.container.addClass('active')
    },
    edit:function(id,content,grade){
        this.type = 'edit'
        this.noteId = id
        this.$title.text('修改便笺')
        this.$btnName.text('修改')
        this.container.find(`.icon-xingxingman[data-grade=${grade+1}]`).prevAll('.icon-xingxingman').css({color:'#00d4ed'})
        this.grade = grade
        this.$textarea.val(content)
        
        this.container.addClass('active')

    },
    close:function(){
        this.container.removeClass('active')        
    },
    submit(){
        const val = this.$textarea.val().trim()
        const grade = this.grade
        if(val !== ''){
            //添加的时候还要加上用户和等级
            if(this.type === 'add'){
                $.post('api/notes/add',{text:val,grade:grade})
                .done((data)=>{
                   const id = data.id
                   date = new Date().toISOString().split('T')[0]
                   note(id,date,val,0,grade)
                   this.close()
                   this.event.emit('reLayout')
                   toast('添加成功')
                })
                .fail((error)=>{
                    console.log('网络异常')
                    toast('网络异常','error')
                })
            }else if(this.type === 'edit'){
                const id = this.noteId
                console.log(`submit grade is ${grade}`)
                $.post('api/notes/edit',{id:this.noteId,text:val,grade:grade})
                .done(()=>{
                   this.close()
                   this.type = 'add'
                   this.noteId = null
                   this.grade = 0
                   $(`li[data-id=${id}] .detail`).text(val) //把编辑页面的值带到主页

                   //把编辑页面上的评级带到主页
                   const x = $(`li[data-id=${id}] .icon-xingxingman[data-grade=${grade}]`)
                   x.css({color:'#00d4ed'})
                   x.prevAll('.icon-xingxingman').css({color:'#00d4ed'})
                   x.nextAll().css({color:'#dbdbdb'})


                   this.event.emit('reLayout')
                   
                   toast('修改成功')
                })
                .fail((error)=>{
                    console.log('网络异常')
                    toast('网络异常','error')
                })
            }
            
            
            
        }else{
            toast('内容不能为空','error')
        }
    }
    
}

const modal = new Modal()

module.exports = modal