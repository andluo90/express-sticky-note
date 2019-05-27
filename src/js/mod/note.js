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
            <li class="item">
                <div class="title">
                <span class="datetime">${this.dateTime}</span>
                <span class="delete">x</span>
                </div>
                <div class="content">
                    ${this.content}
                </div>
                <div class="bottom">
                <div class="grade"></div>
                <div class="${this.status===0 ?'uncompleted':'completed'}">${this.status===0?'未完成':'<span class="iconfont icon-gouxuan"></span>'}</div>
                </div>
            </li>`
        this.$container.prepend($(tmp))

        
        

    }
    
    
}

function Note(id=1,dateTime='2019-01-01',content='Test...',status=0){
    return new note(id=id,dateTime=dateTime,content=content,status=status)
}

module.exports = Note