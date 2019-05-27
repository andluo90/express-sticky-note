require('../../less/waterfall.less')


const note = require('./note')

//瀑布流布局
function waterfall(){
    this.$containter = $('#waterfall')
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
        const l = [0,0,0]
        const elementList = this.$containter.find('li')
        let t = elementList
        const tWidth = $(t[0]).outerWidth()
        $(t).each(function(index,ele){
            const $ele = $(ele)
            let min = Math.min(...l)
            
            const min_index = l.indexOf(min)
            min = min+'px'
            const left = (min_index * tWidth)+'px'

            $ele.css({left:left,top:min})
            l[min_index] = l[min_index]+$ele.outerHeight()
            console.log(`l is ${l}`)

        })
        
        
        
        this.bind()

    },

    bind:function(){
        //布局成功后进行绑定事件
        this.$containter.on('click','.delete',function(e){
            console.log('点击删除.')

        })
        this.$containter.on('click','.uncompleted',function(e){
            console.log('标记为完成')

        })
        console.log('绑定事件成功.')
    }
}

function WaterFall(){
    return new waterfall()
}

module.exports = WaterFall