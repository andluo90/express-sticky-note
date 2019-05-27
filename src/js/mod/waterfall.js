require('../../less/waterfall.less')

const toast = require('./toast')
const note = require('./note')
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
        note(id=111,datTime='2018-01-01',content='abc123..',status=1)
        note(id=222,datTime='2018-01-02',conid=111,datTime='2018-01-01',content='abc123..',status=0)
        note(id=555,datTime='2018-01-05',content='abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123',status=1)
        note(id=333,datTime='2018-01-03',content='abc123abc123abc123abc123abc123abc123abc123abc123',status=1)
        note(id=444,datTime='2018-01-04',content='abc123abc123abc123abc3abc123abc123abc123',status=0)
        note(id=555,datTime='2018-01-05',content='abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123',status=1)
        $.get('/api/notes')
         .done((data)=>{
             console.log('获取数据成功.')
             console.log(data)
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
        
    },

    bind:function(){
        //布局成功后进行绑定事件
        this.$containter.on('click','.delete',function(e){
            $.post('api/notes/delete',{id:123})
             .done((data)=>{
                 console.log(data)
                 toast('删除成功')
             })
             .fail((error)=>{
                 toast('网络异常')
             })

        })
        this.$containter.on('click','.uncompleted',function(e){
            toast('已标记为完成.')
            console.log('标记为完成')

        })

        this.event.on('reLayout',()=>{
            console.log('重新布局...')
            this.layout()
        })

        console.log('绑定事件成功.')
    }
}

function WaterFall(){
    return new waterfall()
}

module.exports = WaterFall