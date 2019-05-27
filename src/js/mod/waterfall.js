require('../../less/waterfall.less')

const toast = require('./toast')
const note = require('./note')

//瀑布流布局
function waterfall(){
    this.$containter = $('#waterfall')
    this.width = $('header .wrapper').width()
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
        this.layout()
        
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
        
        
        
        this.bind()

    },

    bind:function(){
        //布局成功后进行绑定事件
        this.$containter.on('click','.delete',function(e){
            toast('删除成功.')
            console.log('点击删除.')

        })
        this.$containter.on('click','.uncompleted',function(e){
            toast('已标记为完成.')
            console.log('标记为完成')

        })
        console.log('绑定事件成功.')
    }
}

function WaterFall(){
    return new waterfall()
}

module.exports = WaterFall