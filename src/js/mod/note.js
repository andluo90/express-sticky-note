require('../../less/note.less')
const toast = require('./toast')

function note(id,dateTime,content,status=0,){
    this.$container = $('#waterfall')
    this.id = id;
    this.dateTime = dateTime;
    this.content = content;
    this.status = status;

    this.show()
}

note.prototype = {
    show:function(){
        const tmp = `
            <li class="item" data-id=${this.id}>
                <div class="title">
                <span class="datetime">${this.dateTime}</span>
                <span class="delete" data-id=${this.id}>x</span>
                </div>
                <div class="content">
                    <span class="detail">${this.content}</span>
                    <span class="iconfont icon-bianji" data-id=${this.id}></span>
                </div>
                <div class="bottom">
                <div class="grade">
                        <span class="iconfont icon-xingxingman"></span>
                        <span class="iconfont icon-xingxingman"></span>
                        <span class="iconfont icon-xingxingman"></span>
                        <span class="iconfont icon-xingxingman"></span>
                        <span class="iconfont icon-xingxingman"></span>

                </div>
                <div data-id=${this.id} class="${this.status===0 ?'uncompleted':'completed'}">${this.status===0?'未完成':'<span class="iconfont icon-gouxuan"></span>'}</div>
                </div>
            </li>`
        this.$container.prepend($(tmp))

        
        

    }
    
    
}

function Note(id=1,dateTime='2019-01-01',content='text...',status=0){
    return new note(id=id,dateTime=dateTime,content=content,status=status)
}

module.exports = Note