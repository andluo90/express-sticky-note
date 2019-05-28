require('../../less/waterfall.less')

const toast = require('./toast')
const note = require('./note')
const modal = require('./modal')
const event = require('./eventHub')

//瀑布流布局
function waterfall(){
    this.$containter = $('#waterfall')
    this.width = $('header .wrapper').width()
    this.event = event

    this.init()
}

waterfall.prototype = {
    init:function(){
        //获取数据
        $.get('/api/notes')
         .done((rep)=>{
             console.log('获取所有note成功.')
             console.log(rep)
             
             rep.data.forEach((i)=>{
                const date = new Date(i.updatedAt).toISOString().split('T')[0]
                note(id=i.id,dateTime=date,content=i.text,status=i.status)
             })
             this.layout()
             this.bind()
         })
         .fail(()=>{
            console.log('网络异常')
             toast('网络异常')
         })
       
        
    },

    layout:function(){
        //获取完数据后进行布局 
        const t = this.$containter.find('li')

        //计算需要几列`
        let tWidth = $(t[0]).outerWidth()
        const column = Math.floor(this.width/tWidth)
        const l = new Array(column).fill(0)

        //计算元素的margin-right值
        const margin_right = Math.floor((this.width - tWidth*l.length)/(l.length-1))
        console.log(`margin right is: ${margin_right}`)
        
        tWidth = tWidth + margin_right

        $(t).each(function(index,ele){
            const $ele = $(ele)
            let min = Math.min(...l)
            const min_index = l.indexOf(min)
            min = min+'px'
            const left = (min_index * tWidth)+'px'

            $ele.css({left:left,top:min})
            l[min_index] = l[min_index]+$ele.outerHeight(includeMargin=true)

        })
        console.log('重新布局完成.')
        
    },

    bind:function(){
        //布局成功后进行绑定事件
        const self = this
        this.$containter.on('click','.delete',function(e){
            const id = e.target.dataset.id
            $.post('api/notes/delete',{id:id})
             .done((data)=>{
                 $(`li[data-id=${id}]`).remove()
                 self.layout()
                 toast('删除成功')
                 
             })
             .fail((error)=>{
                 toast('网络异常')
             })

        })
        this.$containter.on('click','.uncompleted',function(e){
            const id = e.target.dataset.id
            $.post('api/notes/completed',{id:id})
             .done((data)=>{
                console.log(data)
                const $tmp = $(`div[data-id=${id}]`)
                $tmp.addClass('completed').removeClass('uncompleted')
                $tmp.text('')
                $tmp.append('<span class="iconfont icon-gouxuan"></span>')
                toast('已标记为完成.')
                 
             })
             .fail((error)=>{
                toast('网络异常')
            })

        })

        this.$containter.on('click','.icon-bianji',function(e){
            const id = e.target.dataset.id
            const text = $(e.target).parent().text().trim()
            modal.edit(id,text)

        })

        this.event.on('reLayout',()=>{
            console.log('重新布局...')
            this.layout()
        })

    }
}

function WaterFall(){
    return new waterfall()
}

module.exports = WaterFall